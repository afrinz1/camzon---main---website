from django.db import migrations


def remove_all_products(apps, schema_editor):
    Product = apps.get_model('app', 'Product')
    Product.objects.using(schema_editor.connection.alias).all().delete()


class Migration(migrations.Migration):
    dependencies = [('app', '0003_seed_demo_products')]

    operations = [
        migrations.RunPython(remove_all_products, migrations.RunPython.noop),
    ]
