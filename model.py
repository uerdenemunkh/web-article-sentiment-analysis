import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline


class Model:

    def __init__(self) -> None:
        self.env_claims_model = pipeline(task="text-classification",
                                         model=AutoModelForSequenceClassification.from_pretrained("climatebert/environmental-claims"),
                                         tokenizer=AutoTokenizer.from_pretrained("climatebert/environmental-claims"))

        self.fact_check_model = AutoModelForSequenceClassification.from_pretrained("amandakonet/climatebert-fact-checking")
        self.fact_check_tokenizer = AutoTokenizer.from_pretrained("amandakonet/climatebert-fact-checking")
        self.fact_check_model.eval()

    def predict_environmental_claim(self, sentence):
        return self.env_claims_model(sentence)[0]['label']

    def predict_fact_check(self, sentence):
        features = self.fact_check_tokenizer(sentence, padding='max_length', truncation=True, return_tensors="pt", max_length=512)
        with torch.no_grad():
            scores = self.fact_check_model(**features).logits
            label_mapping = ['contradiction', 'entailment', 'neutral']
            label = label_mapping[scores.argmax(dim=1)]
            # labels = [label_mapping[score_max] for score_max in ]
        return label
