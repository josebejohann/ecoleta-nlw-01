import React, {useEffect, useState} from 'react';
import {Image, Text, View, SafeAreaView, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RectButton, TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import api from '../../services/api';

import styles from './styles';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    state: string;
    city: string;
  };
  items: {
    title: string;
  }[];
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  if (!data.point) {
    return null;
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=Quero saber mais sobre a coleta de resíduos!`,
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={20} color="#34CB79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{uri: data.point.image}} />

        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map((item) => item.title).join(', ')}
        </Text>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.point.city}, {data.point.state}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsApp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={() => {}}>
          <Feather name="mail" size={20} color="#FFF" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
