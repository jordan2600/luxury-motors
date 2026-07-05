import './Brands.css';

import audi       from '../../assets/brands/audi.png';
import bmw        from '../../assets/brands/bmw.png';
import bugatti    from '../../assets/brands/bugatti.png';
import chevrolet  from '../../assets/brands/Chevrolet.png';
import ferrari    from '../../assets/brands/Ferrari.png';
import ford       from '../../assets/brands/ford.png';
import maserati   from '../../assets/brands/maserati.png';
import mazda      from '../../assets/brands/Mazda.png';
import mercedes   from '../../assets/brands/mercedes-benz.png';
import porsche    from '../../assets/brands/porsche.png';
import rollsroyce from '../../assets/brands/Rolls-Royce.png';
import subaru     from '../../assets/brands/Subaru.png';
import tesla      from '../../assets/brands/Tesla.png';
import volkswagen from '../../assets/brands/volkswagen.png';

const brands = [
  { name: 'Mercedes-Benz', img: mercedes   },
  { name: 'BMW',           img: bmw        },
  { name: 'Ford',          img: ford       },
  { name: 'Chevrolet',     img: chevrolet  },
  { name: 'Volkswagen',    img: volkswagen },
  { name: 'Audi',          img: audi       },
  { name: 'Porsche',       img: porsche    },
  { name: 'Subaru',        img: subaru     },
  { name: 'Mazda',         img: mazda      },
  { name: 'Tesla',         img: tesla      },
  { name: 'Maserati',      img: maserati   },
  { name: 'Ferrari',       img: ferrari    },
  { name: 'Rolls-Royce',   img: rollsroyce },
  { name: 'Bugatti',       img: bugatti    },
];

const Brands = () => {
  return (
    <section className="brands">
      <div className="brands__track-wrapper">
        <div className="brands__fade brands__fade--left" />
        <div className="brands__fade brands__fade--right" />

        <div className="brands__track">
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className="brands__item">
              <img src={brand.img} alt={brand.name} className="brands__logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
