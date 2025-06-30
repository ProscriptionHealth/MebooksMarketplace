import { Ebook, ComplexityRating } from '../types';

export const mockEbooks: Ebook[] = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    description: 'Complete guide to ML algorithms and applications. Learn the core concepts, mathematics, and practical implementation of machine learning techniques.',
    author: 'Dr. Sarah Chen',
    price: 29.99,
    coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'Machine Learning',
    complexity: ComplexityRating.Beginner,
    frameworkTags: ['Python', 'Scikit-learn', 'Pandas'],
    pageCount: 245
  },
  {
    id: '2',
    title: 'Deep Learning with TensorFlow',
    description: 'Advanced neural networks and practical implementation. Master deep learning architectures and build production-ready models.',
    author: 'Prof. Michael Rodriguez',
    price: 49.99,
    coverUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'Deep Learning',
    complexity: ComplexityRating.Advanced,
    frameworkTags: ['TensorFlow', 'Keras', 'Python'],
    pageCount: 387
  },
  {
    id: '3',
    title: 'Natural Language Processing Essentials',
    description: 'Text processing and language understanding with AI. From tokenization to transformer models, master NLP techniques.',
    author: 'Dr. Emma Thompson',
    price: 39.99,
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'NLP',
    complexity: ComplexityRating.Intermediate,
    frameworkTags: ['NLTK', 'spaCy', 'Transformers'],
    pageCount: 298
  },
  {
    id: '4',
    title: 'Computer Vision Applications',
    description: 'Image processing and recognition systems. Build computer vision applications from object detection to image generation.',
    author: 'Dr. James Park',
    price: 44.99,
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'Computer Vision',
    complexity: ComplexityRating.Advanced,
    frameworkTags: ['OpenCV', 'PyTorch', 'PIL'],
    pageCount: 356
  },
  {
    id: '5',
    title: 'Data Science with Python',
    description: 'Complete data analysis and visualization guide. Master the full data science pipeline from collection to insights.',
    author: 'Lisa Wang',
    price: 34.99,
    coverUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'Data Science',
    complexity: ComplexityRating.Beginner,
    frameworkTags: ['Python', 'Matplotlib', 'Seaborn'],
    pageCount: 278
  },
  {
    id: '6',
    title: 'AI Ethics and Governance',
    description: 'Responsible AI development and deployment. Navigate the ethical challenges of AI systems in society.',
    author: 'Dr. Robert Kim',
    price: 24.99,
    coverUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'AI Ethics',
    complexity: ComplexityRating.Intermediate,
    frameworkTags: ['Policy', 'Governance', 'Fairness'],
    pageCount: 189
  },
  {
    id: '7',
    title: 'Reinforcement Learning Mastery',
    description: 'Learn how agents make decisions through trial and error. From Q-learning to policy gradients.',
    author: 'Dr. Alex Chen',
    price: 52.99,
    coverUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'Reinforcement Learning',
    complexity: ComplexityRating.Research,
    frameworkTags: ['OpenAI Gym', 'Stable Baselines', 'PyTorch'],
    pageCount: 421
  },
  {
    id: '8',
    title: 'MLOps in Production',
    description: 'Deploy, monitor, and scale machine learning systems. Best practices for ML in production environments.',
    author: 'Jennifer Adams',
    price: 41.99,
    coverUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'MLOps',
    complexity: ComplexityRating.Advanced,
    frameworkTags: ['Docker', 'Kubernetes', 'MLflow'],
    pageCount: 312
  },
  {
    id: '9',
    title: 'Introduction to AI for Business',
    description: 'AI strategies for business leaders. Understand AI capabilities and implementation strategies.',
    author: 'Mark Thompson',
    price: 27.99,
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'Business AI',
    complexity: ComplexityRating.Beginner,
    frameworkTags: ['Strategy', 'ROI', 'Implementation'],
    pageCount: 198
  },
  {
    id: '10',
    title: 'Advanced PyTorch Techniques',
    description: 'Master advanced PyTorch features for research and production. Custom operators, distributed training, and optimization.',
    author: 'Dr. Maria Gonzalez',
    price: 46.99,
    coverUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600',
    category: 'Deep Learning',
    complexity: ComplexityRating.Research,
    frameworkTags: ['PyTorch', 'CUDA', 'Distributed'],
    pageCount: 367
  }
];
