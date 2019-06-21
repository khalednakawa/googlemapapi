from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    startloc = models.CharField(max_length=500, null=True)
    endloc = models.CharField(max_length=500, null=True)
    actualdistance = models.CharField(max_length=500, null=True)

