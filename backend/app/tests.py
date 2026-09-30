from django.test import TestCase
from rest_framework.test import APIClient

from .models import CustomerInquiry, Product


class ProductApiTests(TestCase):
	def setUp(self):
		self.client = APIClient()

	def test_product_list_returns_seeded_products(self):
		response = self.client.get('/api/products/')

		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(response.data), 10)
		self.assertIn('images', response.data[0])

	def test_product_detail_returns_product_and_unknown_slug_is_404(self):
		response = self.client.get('/api/products/camzon-dart-basin-mixer/')
		missing_response = self.client.get('/api/products/not-a-product/')

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.data['id'], 'cam-dart-01')
		self.assertEqual(missing_response.status_code, 404)

	def test_product_filters_and_rejects_invalid_sort(self):
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
