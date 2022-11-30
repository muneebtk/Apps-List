# Generated by Django 4.1.3 on 2022-11-28 17:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('admin_side', '0003_remove_apps_category_remove_subcategory_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subcategory',
            old_name='categories',
            new_name='sub_category',
        ),
        migrations.AddField(
            model_name='category',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='admin_side.apps'),
        ),
        migrations.AddField(
            model_name='subcategory',
            name='name',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=100, null=True),
        ),
    ]