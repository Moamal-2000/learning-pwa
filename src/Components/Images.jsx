import image2 from "../Assets/ps5-gamepad-thum1.webp";
import image3 from "../Assets/ps5-gamepad-thum2.webp";
import image4 from "../Assets/ps5-gamepad-thum3.webp";
import image5 from "../Assets/ps5-gamepad.webp";

const Images = () => {
  return (
    <>
      <h2>Images</h2>
      <div className="images">
        <img src={image2} alt="image 2" />
        <img src={image3} alt="image 3" />
        <img src={image4} alt="image 4" />
        <img src={image5} alt="image 5" />
      </div>
    </>
  );
};
export default Images;
