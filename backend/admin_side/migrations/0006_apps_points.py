# Generated by Django 4.1.3 on 2022-11-29 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_side', '0005_remove_category_category_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='apps',
            name='points',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
