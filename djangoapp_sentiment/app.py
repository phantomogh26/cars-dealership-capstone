from flask import Flask, jsonify
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

# Tải lexicon cần thiết cho VADER (chỉ tải lần đầu, các lần sau sẽ dùng cache)
nltk.download('vader_lexicon')

app = Flask(__name__)
sia = SentimentIntensityAnalyzer()


@app.route('/')
def home():
    return "Sentiment Analyzer service is running"


@app.route('/analyze/<text>')
def analyze(text):
    score = sia.polarity_scores(text)['compound']
    if score >= 0.05:
        label = "positive"
    elif score <= -0.05:
        label = "negative"
    else:
        label = "neutral"
    return jsonify({"sentiment": label})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
