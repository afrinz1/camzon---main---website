from django.contrib import admin
from .models import CustomerInquiry, Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
	list_display = ('title', 'category', 'price', 'stock_count', 'is_featured', 'is_sale')
	list_filter = ('category', 'is_featured', 'is_sale', 'is_new')
	search_fields = ('id', 'slug', 'title', 'sku', 'category')


@admin.register(CustomerInquiry)
class CustomerInquiryAdmin(admin.ModelAdmin):
	list_display = ('name', 'inquiry_type', 'product_name', 'email', 'phone', 'created_at')
	list_filter = ('inquiry_type', 'created_at')
	search_fields = ('name', 'email', 'phone', 'product_name', 'message')
	readonly_fields = ('created_at',)
