import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Andrew',
      email: '2email@email.com',
      password: bcrypt.hashSync('123456', 8),
      isAdmin: true,
    },
    {
      name: 'Chloe',
      email: 'chloe@email.com',
      password: bcrypt.hashSync('123456', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'FOUNDATIONS T-SHIRT - BONE',
      slug: 'foundations-tee-bone',
      category: 'Tops',
      image: '/images/foundations-tee-bone.jpg',
      countInStock: 10,
      price: 35,
      description: `CUSTOM CUT AND SEWN NYLON SHORT WITH EXTRA WIDE ELASTIC WAISTBAND AND 100 THIEVES METAL AGLET TIPPED DRAWSTRINGS. ZIPPERED POCKETS AT HIPS AND SINGLE BACK POCKET. EMBROIDERED 100 THIEVES LOGO ABOVE KNEE AND FLAG WOVEN LABEL AT SIDE SEAM. RED NYLON WEBBING HANGING LOOP AT BACK WAISTBAND. ALL ZIPPERS ARE YKK WITH CUSTOM 100 THIEVES PULLS.

      BUILT FROM SCRATCH CUSTOM CUT AND SEWN GARMENT.
      ABOVE THE KNEE FIT
      ZIPPERED POCKETS AT HIPS AND SINGLE BACK ZIPPERED POCKET WITH CUSTOM 100 THIEVES ZIPPERS
      EXTRA WIDE ELASTIC WAIST WITH CUSTOM 100 THIEVES METAL AGLET TIPPED DRAWSTRING.
      RED NYLON WEBBING HANGING LOOP AT BACK WAISTBAND.
      EMBROIDERED 100 THIEVES LOGO AT THIGH
      FLAG WOVEN LABEL AT SIDE SEAM.`,
    },
    {
      name: 'FOUNDATIONS T-SHIRT - BLACK',
      slug: 'foundations-tee-black',
      category: 'Tops',
      image: '/images/foundations-tee-black.jpg',
      countInStock: 12,
      price: 35,
      description: ``,
    },
    {
      name: 'FOUNDATIONS T-SHIRT - GREY',
      slug: 'foundations-tee-grey',
      category: 'Tops',
      image: '/images/foundations-tee-grey.jpg',
      countInStock: 8,
      price: 35,
      description: ``,
    },
    {
      name: 'FOUNDATIONS CREWNECK - ALPINE',
      slug: 'foundations-crewneck-alpine',
      category: 'Tops',
      image: '/images/foundations-crewneck-alpine.jpg',
      countInStock: 35,
      price: 85,
      description: ``,
    },
    {
      name: 'FOUNDATIONS CREWNECK - BLACK',
      slug: 'foundations-crewneck-black',
      category: 'Tops',
      image: '/images/foundations-crewneck-black.jpg',
      countInStock: 40,
      price: 85,
      description: ``,
    },
    {
      name: 'FOUNDATIONS CREWNECK - GREY',
      slug: 'foundations-crewneck-grey',
      category: 'Tops',
      image: '/images/foundations-crewneck-grey.jpg',
      countInStock: 40,
      price: 85,
      description: ``,
    },
    {
      name: 'FOUNDATIONS NYLON PANT - ALPINE',
      slug: 'foundations-nylon-pant-alpine',
      category: 'Tops',
      image: '/images/foundations-nylon-pant-alpine.jpg',
      countInStock: 20,
      price: 85,
      description: ``,
    },
    {
      name: 'FOUNDATIONS NYLON PANT - BLACK',
      slug: 'foundations-nylon-pant-black',
      category: 'Tops',
      image: '/images/foundations-nylon-pant-black.jpg',
      countInStock: 25,
      price: 85,
      description: ``,
    },
    {
      name: 'FOUNDATIONS NYLON PANT - RED',
      slug: 'foundations-nylon-pant-red',
      category: 'Tops',
      image: '/images/foundations-nylon-pant-red.jpg',
      countInStock: 30,
      price: 85,
      description: ``,
    },
    {
      name: 'FOUNDATIONS NYLON SHORT - RED',
      slug: 'foundations-nylon-short-red',
      category: 'Tops',
      image: '/images/foundations-nylon-short-red.jpg',
      countInStock: 15,
      price: 68,
      description: ``,
    },
    {
      name: 'FOUNDATIONS NYLON SHORT - ROYAL',
      slug: 'foundations-nylon-short-royal',
      category: 'Tops',
      image: '/images/foundations-nylon-short-royal.jpg',
      countInStock: 12,
      price: 68,
      description: ``,
    },
    {
      name: 'FOUNDATIONS NYLON SHORT - ALPINE',
      slug: 'foundations-nylon-short-alpine',
      category: 'Tops',
      image: '/images/foundations-nylon-short-alpine.jpg',
      countInStock: 18,
      price: 68,
      description: ``,
    },
  ],
};

export default data;
