import React, { useEffect, useState } from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import AppContainer from '../../../components/AppContainer.tsx';
import Api from '../../../api';
import SelectTheme from '../../../components/SelectTheme.tsx';
import CourseItem, {CourseItemType} from "../../../components/CourseItem.tsx";

const WelcomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleGetCourses = async () => {
    setLoading(true);
    try {
      const response = await Api.getCourses();
      setData(response.data);
      setFilteredData(response.data);
    } catch (e) {
      console.log(e, 'getcourses error');
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };


  const filterByTag = (tag: string | null) => {
    setSelectedTag(tag);
    if (!tag) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((course: CourseItemType) => course.tags.includes(tag));
      setFilteredData(filtered);
    }
  };


  const renderItem = ({item}:any)=> {
    return(
       <CourseItem item={item}/>
    )
  }

  useEffect(() => {
    (async () => handleGetCourses())();
  }, []);

  return (
    <AppContainer>
      {!loading ? (
        <View style={styles.container}>
          <View style={{marginBottom: 24}}>
            <SelectTheme data={data} selectedTag={selectedTag} onSelectTag={filterByTag} />
          </View>

          <FlatList
              horizontal
              data={filteredData}
              renderItem={renderItem}
              contentContainerStyle={styles.flatListContainer}
              keyExtractor={(item) => item.id}

          />
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </AppContainer>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container:{
    paddingBottom: 80
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer:{
    gap: 24
  }
});
