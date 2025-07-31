import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export interface CourseItemType {
    name: string;
    id: string;
    image: string;
    bgColor: string;
    tags: string[];
}

interface IProps {
    item: CourseItemType;
}


const CourseItem: React.FC<IProps> = ({ item }) => {
    return (
        <View style={[styles.container, { backgroundColor: item.bgColor }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.tags}>{item.tags.join(', ')}</Text>
        </View>
    );
};

export default CourseItem;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
        height: 200,
        width: 200
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
    },
    tags: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});
