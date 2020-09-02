from django.db import models

# Create your models here.
class Activity(models.Model):
    activity = models.CharField(max_length=30)
    username = models.CharField(max_length=20)


# serializer classes
from rest_framework import serializers

class ActivitySerializer(serializers.Serializer):
    activity = serializers.CharField(max_length=30)
    username = serializers.CharField(max_length=20)
    id = serializers.IntegerField()

