from rest_framework import serializers

from .models import CustomerInquiry, Product


class ProductSerializer(serializers.ModelSerializer):
    originalPrice = serializers.IntegerField(source='original_price', allow_null=True, read_only=True)
    reviewsCount = serializers.IntegerField(source='reviews_count', read_only=True)
    isNew = serializers.BooleanField(source='is_new', read_only=True)
    isSale = serializers.BooleanField(source='is_sale', read_only=True)
    isFeatured = serializers.BooleanField(source='is_featured', read_only=True)
    stockCount = serializers.IntegerField(source='stock_count', read_only=True)

    class Meta:
        model = Product
        fields = (
            'id', 'slug', 'title', 'subtitle', 'category', 'price', 'originalPrice',
            'rating', 'reviewsCount', 'isNew', 'isSale', 'isFeatured', 'badge',
            'colors', 'images', 'description', 'story', 'details', 'specs',
            'stockCount', 'sku', 'reviews',
        )


class ProductQuerySerializer(serializers.Serializer):
    category = serializers.CharField(required=False, allow_blank=True, max_length=40)
    search = serializers.CharField(required=False, allow_blank=True, max_length=100)
    sort = serializers.ChoiceField(
        choices=('featured', 'price-low', 'price-high', 'rating'),
        required=False,
        default='featured',
    )


class CustomerInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerInquiry
        fields = (
            'id',
            'inquiry_type',
            'name',
            'email',
            'phone',
            'message',
            'product_name',
            'created_at',
        )
        read_only_fields = ('id', 'created_at')

    def validate(self, attrs):
        inquiry_type = attrs.get('inquiry_type')
        if inquiry_type == CustomerInquiry.CONTACT and not attrs.get('email', '').strip():
            raise serializers.ValidationError({'email': 'Email is required for contact inquiries.'})
        if inquiry_type == CustomerInquiry.ORDER and not attrs.get('phone', '').strip():
            raise serializers.ValidationError({'phone': 'Phone is required for order inquiries.'})
        return attrs