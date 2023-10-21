import { useNavigate, useLocation } from 'react-router-dom';
import appForm from '../../components/Form/appForm';
import { saveApplication } from '../../services/application';

export default function EditAppliction() {
  const navigate = useNavigate();
  const location = useLocation();

  const fields = [
    {
        label: 'Product Name',
        name: 'name',
        type: 'text',
        rules: [
          { required: true, message: 'Name cannot be empty' },
        ]
    },
    {
        label: 'Product Description',
        name: 'description',
        type: 'textarea'
    },
    {
        label: 'Category',
        name: 'category',
        type: 'select',
        rules: [
          { required: true, message: 'Category cannot be empty' },
        ]
    },
    {
        label: 'Price',
        name: 'price',
        type: 'text',
        rules: [
          { required: true, message: 'Price cannot be empty' },
        ]
    },
    {
        label: 'In Stock Quantity',
        name: 'quantity',
        type: 'text',
        rules: [
          { required: true, message: 'Quantity cannot be empty' },
        ]
    },
    {
        label: 'Add Image Link',
        placeholder: 'http://',
        name: 'imageUrl',
        type: 'text'
    }
  ];

  const onSubmit = async (formData) => {
    try {
      const response = await createNewProduct(formData);
      navigate(location.state?.from || '/');
      console.log(`Product successfully created ${response}`);
    } catch (err) {
      console.error("Error creating new product: ", err);
    }
  };

  return (
    <div>
      <ProductForm
        buttonText="Add Product"
        onSubmit={onSubmit}
        title="Create Product"
        fields={fields}
      />
    </div>
  );
}