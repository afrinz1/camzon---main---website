from django.test import TestCase
from rest_framework.test import APIClient

from .models import CustomerInquiry, Product


class ProductApiTests(TestCase):
	def setUp(self):
		self.client = APIClient()

	def test_product_list_is_empty_without_products(self):
		response = self.client.get('/api/products/')

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data, [])

	def test_product_detail_returns_product_and_unknown_slug_is_404(self):
		Product.objects.create(
			id='test-product',
			slug='test-product',
			title='Test product',
			subtitle='A product for API tests.',
			category='DART',
			price=1000,
			sku='TEST-001',
			description='A test product.',
		)
		response = self.client.get('/api/products/camzon-dart-basin-mixer/')
		missing_response = self.client.get('/api/products/not-a-product/')
		test_product_response = self.client.get('/api/products/test-product/')

		self.assertEqual(response.status_code, 404)
		self.assertEqual(test_product_response.status_code, 200)
		self.assertEqual(test_product_response.data['id'], 'test-product')
		self.assertEqual(missing_response.status_code, 404)

	def test_product_filters_and_rejects_invalid_sort(self):
		Product.objects.create(
			id='test-dart',
			slug='test-dart',
			title='Test DART',
			subtitle='A DART product for API tests.',
			category='DART',
			price=1000,
			sku='TEST-DART',
			description='A test DART product.',
		)
		Product.objects.create(
			id='test-duero',
			slug='test-duero',
			title='Test DUERO',
			subtitle='A DUERO product for API tests.',
			category='DUERO',
			price=2000,
			sku='TEST-DUERO',
			description='A test DUERO product.',
		)
		filtered_response = self.client.get('/api/products/?category=DART')
		invalid_response = self.client.get('/api/products/?sort=unknown')

		self.assertEqual(filtered_response.status_code, 200)
		self.assertTrue(all(item['category'] == 'DART' for item in filtered_response.data))
		self.assertEqual(invalid_response.status_code, 400)


class CustomerInquiryApiTests(TestCase):
	def setUp(self):
		self.client = APIClient()

	def test_contact_inquiry_is_saved(self):
		response = self.client.post(
			'/api/inquiries/',
			{
				'inquiry_type': CustomerInquiry.CONTACT,
				'name': 'Asha',
				'email': 'asha@example.com',
				'message': 'Please send the product catalogue.',
			},
			format='json',
		)

		self.assertEqual(response.status_code, 201)
		self.assertEqual(CustomerInquiry.objects.count(), 1)

	def test_order_inquiry_requires_phone(self):
		response = self.client.post(
			'/api/inquiries/',
			{'inquiry_type': CustomerInquiry.ORDER, 'name': 'Asha', 'product_name': 'CAMZON DART'},
			format='json',
		)

		self.assertEqual(response.status_code, 400)
		self.assertEqual(CustomerInquiry.objects.count(), 0)
