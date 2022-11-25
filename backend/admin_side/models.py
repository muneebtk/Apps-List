from django.db import models


class Apps(models.Model):
    app_name=models.CharField(max_length=100)
    app_link=models.CharField(max_length=500)
    # category=models.ForeignKey()