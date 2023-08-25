import React from 'react'
import { Modal, View, Text, Pressable, StyleSheet, FlatList, Dimensions } from 'react-native';
import { theme } from '../utils';
import { category_list } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { setCategory } from '../redux/expenseSlice';

const screenWidth = Dimensions.get('window').width

function CategoryModal({ visible, onClose }) {
    const dispatch = useDispatch();
    return (
        <Modal visible={visible}>
            <View style={styles.headerBar}>
                <Text style={styles.headerText}>Category</Text>
                <Pressable onPress={onClose}>
                    <Text style={styles.saveBtn}>Cancel</Text>
                </Pressable>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <FlatList
                    data={category_list}
                    renderItem={({ item: category }) => {
                        return (
                            <View style={{ marginBottom: 15 }}>
                                <Text style={styles.categoryTitle}>{category.title}</Text>
                                <FlatList
                                    // ItemSeparatorComponent={Separator}
                                    data={category.list}
                                    renderItem={({ item }) => {
                                        return (
                                            <Pressable onPress={() => {
                                                dispatch(setCategory({
                                                    title: category.title,
                                                    color: category.color,
                                                    sub_category: {
                                                        title: item.title,
                                                        iconTitle: item.iconTitle,
                                                    },
                                                }));
                                                onClose();
                                            }} style={styles.categoryCard}>
                                                <View style={{ backgroundColor: category.color, ...styles.icon }}>
                                                    <Ionicons name={item.iconTitle} size={40} />
                                                </View>
                                                <Text style={styles.categoryLabel}>{item.title}</Text>
                                            </Pressable>
                                        )
                                    }} />
                            </View>
                        );

                    }}
                />

            </View>
        </Modal>
    );
}

export default CategoryModal;

const styles = StyleSheet.create({
    headerBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    headerText: {
        fontFamily: 'Montserrat_600',
    },
    saveBtn: {
        fontFamily: 'Montserrat_500',
        color: theme.primary
    },
    categoryTitle: {
        fontFamily: 'Montserrat_600',
        color: 'black',
    },
    categoryCard: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        gap: 15,
        backgroundColor: 'rgba(0,0,0,0.02)'
    },
    icon: {
        padding: 5,
    },
    categoryLabel: {
        fontFamily: 'Montserrat_400',
        color: 'black'
    }
})