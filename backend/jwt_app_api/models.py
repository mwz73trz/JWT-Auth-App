from django.db import models
from django.contrib.auth.models import User

class State(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="states")

    def __str__(self):
        return f"{self.name}"

class Capital(models.Model):
    name = models.CharField(max_length=100)
    been = models.BooleanField(default=False)
    state = models.ForeignKey(State, on_delete=models.CASCADE, related_name="capitals")

    def __str__(self):
        return f"{self.user} has been to {self.name}"
