from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from transformers import pipeline
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'your_secret_key'
db = SQLAlchemy(app)
login_manager = LoginManager(app)

# Load models
models = {
    "distilbert": pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english"),
    "roberta": pipeline("text-classification", model="roberta-base")
}

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# ... (rest of your routes remain unchanged)

if __name__ == '__main__':
    db.create_all()  # Create database tables
    app.run(debug=True)