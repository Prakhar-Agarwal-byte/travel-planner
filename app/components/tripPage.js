import React, { useState } from 'react';
import { View, Text, TextInput, Button} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
const CreateTripPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fromDestination, setFromDestination] = useState('');
  const [toDestination, setToDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [stops, setStops] = useState([]);

  const handleAddStop = () => {
    // Logic to add a stop to the 'stops' state
    // You'll need to define a Stop component and manage the stop list
  };
  const [isOpen,setIsOpen]=useState(false);
  const [currentValue,setCurrentValue]=useState('Select Community');
  const community=[
    { label: "Beach Getaway",value: "Beach Getaway"},
    { label: "City Adventure",value: "City Adventure"},
    { label: "Mountain Expedition",value: "Mountain Expedition"},
    { label: "Cultural Exploration",value: "Cultural Exploration"},
    { label: "Wildlife Safari",value: "Wildlife Safari"}
  ];
  const handleCreateTrip = () => {
    // Logic to create the trip using the collected data
  };

  return (
    <View style={{padding:30}}>
      <Text style={{fontSize:30,textAlign:'center',color:"black"}}>Create Trip</Text>
      <TextInput
      style={{borderWidth:2,margin:2,borderColor:"grey",borderRadius:5}}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput style={{borderWidth:2,margin:2,borderColor:"grey",borderRadius:5}}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
      style={{borderWidth:2,margin:2,borderColor:"grey",borderRadius:5}}
        placeholder="From Destination"
        value={fromDestination}
        onChangeText={setFromDestination}
      />
      <TextInput
      style={{borderWidth:2,margin:2,borderColor:"grey",borderRadius:5}}
        placeholder="To Destination"
        value={toDestination}
        onChangeText={setToDestination}
      />
      <TextInput
      style={{borderWidth:2,margin:2,borderColor:"grey",borderRadius:5}}
        placeholder="Start Date and Time"
        value={startDate}
        onChangeText={setStartDate}
      />
      <DropDownPicker
      items={community}
      open={isOpen}
      setOpen={()=>setIsOpen(!isOpen)}
      value={currentValue} 
      setValue={(val)=>setCurrentValue(val)}
      placeholder='Select Community'
      maxHeight={100}
      style={{zIndex:10000,marginBottom:100}}
      />
      {/* <Button  title="Add Stop"  onPress={handleAddStop} /> */}
      <View style={{paddingLeft:20,paddingRight:20,margin:5,borderRadius:5}}>
      <Button title="Create Trip" onPress={handleCreateTrip} />
      </View>
      
    </View>
  );
};

export default CreateTripPage;
