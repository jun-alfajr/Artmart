import React from 'react';
import Hero from './Hero';

export default function About() {
  return (
    <div>
        <Hero pageName={"About Us"}/>
        <div className="container col-8 col-offset-3 m-1 mb-5 mt-5">
        <p>Welcome to Artmart,</p> <p>your number one source for all things handmade. We're dedicated to delivering you the very best hand-made products, with a focus on dependability, customer service and uniqueness.
        Founded in 2019 by Faris Huskovic and Benjamin Lin, Artmart has come a long way from its beginnings in Atlanta Tech Village. When Faris and Ben first started out, there passion for software-developement 
        and making lots of money drove them to quit their jobs and gave them the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over the world, and are thrilled 
        to be a part of the handmade-goods wing of the retail industry.</p>

        <p>We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>

        <p>Sincerely,</p>
        <p>Faris and Ben</p>
        </div>
    </div>
  )
}
