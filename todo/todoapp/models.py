from django.db import models

# Create your models here.
class Activity(models.Model):
    activity = models.CharField(max_length=30)
    username = models.CharField(max_length=20)
    create_date = models.DateTimeField(auto_now=False)
    target_date = models.DateTimeField(auto_now=False)
    completed = models.CharField(max_length=3)

# serializer classes
from rest_framework import serializers

class ActivitySerializer(serializers.Serializer):
    activity = serializers.CharField(max_length=30)
    username = serializers.CharField(max_length=20)
    create_date = serializers.DateTimeField()
    target_date = serializers.DateTimeField()
    completed = serializers.CharField(max_length=1)
    id = serializers.IntegerField()

