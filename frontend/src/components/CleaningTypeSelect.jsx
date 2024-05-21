import './CleaningTypeSelect.css';

const CleaningTypeSelect = (props) => {
  const dropdownChangeHandler = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className="cleaning-type-dropdown">
      <select value={props.cleaningType} onChange={dropdownChangeHandler}>
        <option value="regular-domestic">Regular domestic cleaning</option>
        <option value="deep-domestic">Deep domestic cleaning</option>
        <option value="light-domestic">Light domestic cleaning</option>
        {/* <option value="carpets">Carpets cleaning</option>
        <option value="windows">Windows cleaning</option>
        <option value="upholstery">Upholstery cleaning</option>
        <option value="ironing">Ironing</option>
        <option value="eco-friendly">Eco-friendly cleaning</option>
        <option value="end-of-tenancy">End of tenancy cleaning</option>
        <option value="after-construction">After construction cleaning</option>
        <option value="regular-office">Regular office cleaning</option>
        <option value="deep-office">Deep office cleaning</option>
        <option value="light-office">Light office cleaning</option> */}
      </select>
    </div>
  );
};

export default CleaningTypeSelect;
