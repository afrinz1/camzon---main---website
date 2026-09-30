from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from django.db.models import Q

from .models import Product
from .serializers import CustomerInquirySerializer, ProductQuerySerializer, ProductSerializer


class ProductListView(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        query = ProductQuerySerializer(data=self.request.query_params)
        if not query.is_valid():
            raise ValidationError(query.errors)

        params = query.validated_data
        products = Product.objects.all()
        category = params.get('category', '').strip()
        search = params.get('search', '').strip()
        if category and category.lower() != 'all':
            products = products.filter(category__iexact=category)
        if search:
            products = products.filter(
                Q(title__icontains=search)
                | Q(subtitle__icontains=search)
                | Q(category__icontains=search)
                | Q(description__icontains=search)
            )

        sort = params.get('sort', 'featured')
        if sort == 'price-low':
            return products.order_by('price', 'title')
        if sort == 'price-high':
            return products.order_by('-price', 'title')
        if sort == 'rating':
            return products.order_by('-rating', 'title')
        return products.order_by('-is_featured', 'title')


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class CustomerInquiryCreateView(CreateAPIView):
    serializer_class = CustomerInquirySerializer
    permission_classes = [AllowAny]
    authentication_classes = []
    throttle_classes = [AnonRateThrottle]