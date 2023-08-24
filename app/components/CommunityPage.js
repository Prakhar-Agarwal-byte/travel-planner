import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

const CreateCommunityPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loction, setLocation] = useState('');

  const handleCreateCommunity = () => {
    // Logic to create the trip using the collected data
  };

  return (
    <View style={{padding: 30}}>
      <Text style={{fontSize: 30, textAlign: 'center', color: 'black'}}>
        Create Community
      </Text>
      <View style={{marginBottom:50,marginTop:50}}>
        <TextInput
          style={{
            borderWidth: 2,
            margin: 2,
            borderColor: 'grey',
            borderRadius: 5,
          }}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={{
            borderWidth: 2,
            margin: 2,
            borderColor: 'grey',
            borderRadius: 5,
            
          }}
          placeholder="Community Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={{
            borderWidth: 2,
            margin: 2,
            borderColor: 'grey',
            borderRadius: 5,
          }}
          placeholder="Location"
          value={loction}
          onChangeText={setLocation}
        />
      </View>

      {/* <Button  title="Add Stop"  onPress={handleAddStop} /> */}
      <View
        style={{paddingLeft: 20, paddingRight: 20, margin: 5, borderRadius: 5}}>
        <Button title="Create Community" onPress={handleCreateCommunity} />
      </View>
    </View>
  );
};

export default CreateCommunityPage;
