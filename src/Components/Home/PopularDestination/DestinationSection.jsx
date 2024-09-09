import PopularPlaces from './PopularPlaces'
import { data } from '../../../assets/DataFiles/DataPopularPlaces'
import './Destination.css'

export default function Destination() {
    return (
        <section className='popularPlace-body'>
            <div className='popularPlace-destinationsHead'>
                <h3>
                    Popular Destinations
                </h3>
                <p className='popularPlace-destinationPara'>
                    Tours gives you the opportunity to see alot
                </p>
            </div>
            {
                data.map(sect => (
                    <PopularPlaces
                        title={sect.title}
                        class={sect.class}
                        para={sect.para}
                        Img1={sect.img1}
                        Img2={sect.img2}
                        key={sect.id}
                        fade1={sect.fadeDirection1}
                        fade2={sect.fadeDirection2}
                    />
                ))

            }
        </section>
    )
}