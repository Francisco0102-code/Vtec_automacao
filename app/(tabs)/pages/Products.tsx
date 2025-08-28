import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import api from "../../../api.json";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
}

const Products = () => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  // Definir número de colunas automaticamente
  const numColumns = screenWidth > 800 ? 3 : screenWidth > 500 ? 2 : 1;

  // Definir largura máxima de cada card
  const CARD_WIDTH = Math.min(
    (screenWidth - (numColumns + 1) * 10) / numColumns,
    250
  );

  const renderItem = ({ item }: { item: Produto }) => (
    <View style={[styles.produtoCard, { width: CARD_WIDTH }]}>
      <Image source={{ uri: item.imagem }} style={styles.produtoImagem} />
      <Text style={styles.produtoNome}>{item.nome}</Text>
      <Text style={styles.produtoDescricao}>{item.descricao}</Text>
      <Text style={styles.produtoPreco}>R$ {item.preco.toFixed(2)}</Text>
    </View>
  );

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const width = event.nativeEvent.layout.width;
        setScreenWidth(width);
      }}
    >
      <Text style={styles.title}>Produtos</Text>

      <FlatList
        data={api}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        key={numColumns} // força recriação ao mudar colunas
        contentContainerStyle={styles.produtosContainer}
        columnWrapperStyle={
          numColumns > 1
            ? { justifyContent: "space-between", marginBottom: 15 }
            : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  produtosContainer: { paddingBottom: 20 },
  produtoCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 15,
    elevation: 2,
  },
  produtoImagem: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 5,
  },
  produtoNome: { fontSize: 16, fontWeight: "bold", color: "#333" },
  produtoDescricao: { fontSize: 14, color: "#555", marginBottom: 5 },
  produtoPreco: { fontSize: 14, fontWeight: "bold", color: "#007BFF" },
});

export default Products;
