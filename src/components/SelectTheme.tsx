import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Modal, View, ScrollView} from "react-native";
import {CourseItemType} from "./CourseItem.tsx";

interface Props {
    data: CourseItemType[];
    selectedTag: string | null;
    onSelectTag: (tag: string | null) => void;
}

const SelectTheme: React.FC<Props> = ({ data, selectedTag, onSelectTag }) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const getAllTags = (): string[] => {
        const allTags = data.flatMap(course => course.tags);
        return Array.from(new Set(allTags)); // уникальные теги
    };

    const handleSelect = (tag: string | null) => {
        onSelectTag(tag);
        setIsVisible(false);
    };

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.4} onPress={() => setIsVisible(true)}>
            <Text style={styles.title}>
                {selectedTag || 'Все темы'}
            </Text>

            <Modal visible={isVisible} animationType="slide">
                <View style={styles.modal}>
                    <Text style={styles.closeModal} onPress={() => setIsVisible(false)}>
                        Закрыть
                    </Text>

                    <ScrollView style={{marginTop: 16}}>
                        <TouchableOpacity onPress={() => handleSelect(null)} style={styles.item}>
                            <Text style={styles.itemText}>Все темы</Text>
                        </TouchableOpacity>

                        {getAllTags().map((tag, index) => (
                            <TouchableOpacity key={index} onPress={() => handleSelect(tag)} style={styles.item}>
                                <Text style={styles.itemText}>{tag}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </TouchableOpacity>
    );
};

export default SelectTheme;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        backgroundColor: '#7446EE',
        paddingVertical: 12,
        borderRadius: 12,
        alignSelf: 'center'
    },
    title: {
        color: '#fff'
    },
    modal: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 64,
        paddingHorizontal: 16
    },
    closeModal: {
        color: '#000',
        fontSize: 20,
        textAlign: 'right'
    },
    item: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    itemText: {
        fontSize: 18,
        color: '#333'
    }
})
