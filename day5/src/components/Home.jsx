import React from 'react'
import Button from './ui/Button'
import Products from './Products'

const HeroImage =
    'https://plus.unsplash.com/premium_photo-1681488350342-19084ba8e224?q=80&w=1688&auto=format&fit=crop&ixlib=rb-4.1.0'

const Home = () => {
    return (
        <>
        <div>

        
        
        <section
            className='relative mx-auto flex max-w-9xl flex-col-reverse gap-10 px-6 py-16 md:grid md:grid-cols-2 md:items-center md:gap-14'
            aria-labelledby='hero-heading'
        >
            <div className='flex flex-col items-start'>
                <p className='mb-3 text-xs font-medium uppercase tracking-wider text-emerald-600'>
                    New Season Drop
                </p>
                <h1
                    id='hero-heading'
                    className='mb-4 text-pretty text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl'
                >
                    Find Your Style.
                    <span className='block bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent'>
                        Shop with SenCart
                    </span>
                </h1>
                <p className='mb-8 max-w-md text-sm text-muted-foreground/90 md:text-base'>
                    Curated fashion, seamless checkout, fast delivery. Refresh the wardrobe today.
                </p>
                <div className='flex flex-wrap items-center gap-4'>
                    <Button>Start Shopping</Button>
                   
                </div>
            </div>

            <figure className='relative'>
                <div className='group overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-md'>
                    <img
                        src={HeroImage}
                        alt='Assorted contemporary fashion items neatly arranged'
                        loading='lazy'
                        width={1200}
                        height={800}
                        className='h-full w-full scale-105 object-cover transition duration-700 group-hover:scale-110'
                    />
                </div>
                
                <div className='pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-black/10 via-transparent to-transparent' />
            </figure>

            <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_60%)]'
            />
       
        </section>
         <Products />
         </div>
        </>
    )
}

export default Home