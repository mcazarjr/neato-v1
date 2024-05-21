
const CleaningTypeTasks = ({ cleaningType }) => {
  const getTasksForCleaningType = (type) => {
    switch (type) {
      case "regular-domestic":
        return [
          "Regular bathrooms cleaning",
          "Regular bedrooms cleaning",
          "Regular kitchen cleaning",
          "Regular living cleaning",
          "Regular dining room cleaning",
          "Regular corridors cleaning",
          "Regular patio cleaning",
        ];
      case "deep-domestic":
        return [
          "Deep bathrooms cleaning",
          "Deep bedrooms cleaning",
          "Deep kitchen cleaning",
          "Deep living cleaning",
          "Deep dining room cleaning",
          "Deep corridors cleaning",
          "Deep patio cleaning",
        ];
      case "light-domestic":
        return [
          "Light bathrooms cleaning",
          "Light bedrooms cleaning",
          "Light kitchen cleaning",
          "Light living cleaning",
          "Light dining room cleaning",
          "Light corridors cleaning",
          "Light patio cleaning",
        ];
      default:
        return [];
    }
  };

  const tasks = getTasksForCleaningType(cleaningType);

  return (
    <div>
      <h3>Tasks for Cleaning Type: {cleaningType}</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default CleaningTypeTasks;
