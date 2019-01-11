# Generated by Django 2.1.4 on 2019-01-10 19:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_auto_20190110_2222'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('parameters', models.ManyToManyField(to='app.Parameter')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='name',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='purchase_price',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='address',
            name='street_type',
            field=models.CharField(choices=[('ул', 'улица'), ('пер', 'переулок'), ('пр', 'проезд'), ('бул', 'бульвар'), ('пл', 'площадь'), ('тр', 'тракт'), ('шс', 'шоссе')], default='ул', max_length=30),
        ),
        migrations.AddField(
            model_name='product',
            name='type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='app.ProductType'),
            preserve_default=False,
        ),
    ]
