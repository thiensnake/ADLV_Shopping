
import React, { Component } from 'react';

class Gmap extends Component {
  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">Vị trí cửa hàng</h2>
        <iframe title="gmap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.504378188238!2d106.71993597488239!3d10.772628289375886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f7bdbe2a54d%3A0x77769fd87b61cfe6!2sACM%C3%89%20DE%20LA%20VIE%20(ADLV)!5e0!3m2!1sen!2sus!4v1701415378117!5m2!1sen!2sus" width="800" height="600" style={{ border: 0 }} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    );
  }
}
export default Gmap;