from django.db import models


class Product(models.Model):
	id = models.CharField(max_length=80, primary_key=True)
	slug = models.SlugField(max_length=180, unique=True)
	title = models.CharField(max_length=180)
	subtitle = models.CharField(max_length=300)
	category = models.CharField(max_length=40, db_index=True)
	price = models.PositiveIntegerField()
	original_price = models.PositiveIntegerField(null=True, blank=True)
	rating = models.FloatField(default=0)
	reviews_count = models.PositiveIntegerField(default=0)
	is_new = models.BooleanField(default=False)
	is_sale = models.BooleanField(default=False)
	is_featured = models.BooleanField(default=False)
	badge = models.CharField(max_length=60, blank=True)
	colors = models.JSONField(default=list)
	images = models.JSONField(default=list)
	description = models.TextField()
	story = models.TextField(blank=True)
	details = models.JSONField(default=list)
	specs = models.JSONField(default=dict)
	stock_count = models.PositiveIntegerField(default=0)
	sku = models.CharField(max_length=80, unique=True)
	reviews = models.JSONField(default=list)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-is_featured', 'title']

	def __str__(self):
		return self.title


class CustomerInquiry(models.Model):
	CONTACT = 'contact'
	ORDER = 'order'
	INQUIRY_TYPES = [
		(CONTACT, 'Contact'),
		(ORDER, 'Order'),
	]

	inquiry_type = models.CharField(max_length=10, choices=INQUIRY_TYPES)
	name = models.CharField(max_length=120)
	email = models.EmailField(blank=True)
	phone = models.CharField(max_length=32, blank=True)
	message = models.TextField(blank=True)
	product_name = models.CharField(max_length=160, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-created_at']

	def __str__(self):
		return f'{self.get_inquiry_type_display()} from {self.name}'

