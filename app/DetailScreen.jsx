import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from 'react';

export default function DetailScreen({ route }) {
    const { id } = route.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product details');
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [id]);

    if (loading) return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" />
            <Text>Loading product details...</Text>
        </View>
    );
    
    if (error) return (
        <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>ZAR{product.price}</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
    },
    image: {
        width: '100%',
        height: 300,
        backgroundColor: 'white',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
    }
});