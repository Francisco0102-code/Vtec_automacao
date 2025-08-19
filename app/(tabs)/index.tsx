import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../api.json';
       import { router } from 'expo-router';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
}

const Index: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  // Define número de colunas baseado na largura da tela
  const numColumns = screenWidth > 800 ? 3 : screenWidth > 500 ? 2 : 1;

  // Calcula largura do card e aplica largura máxima
  const CARD_WIDTH = Math.min((screenWidth - (numColumns + 1) * 10) / numColumns, 250);

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
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>Vtec</Text>

        {/* Hamburger menu */}
        <TouchableOpacity onPress={() => setMenuOpen(true)}>
          <Ionicons name="menu" size={28} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Menu em Modal */}
      <Modal
        visible={menuOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMenuOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setMenuOpen(false)}
        >
          <View style={styles.menu}>
    

{['Suporte','Configurações','Sobre','Logout','Notificações','Perfil','Ajuda','Feedback','Produtos'].map((item, index) => (
  <TouchableOpacity
    key={index}
    style={styles.menuItem}
    onPress={() => {
      setMenuOpen(false);
      switch(item) {
        case 'Suporte':
          router.push('/suporte');
          break;
        case 'Configurações':
          router.push('/configuracoes');
          break;
        case 'Sobre':
          router.push('/sobre');
          break;
        case 'Logout':
          router.push('/login');
          break;
        // adicione as outras rotas conforme necessário
        default:
          break;
      }
    }}
  >
    <Text style={styles.menuText}>{item}</Text>
  </TouchableOpacity>
))}

       
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Produtos */}
      <Text style={styles.sectionTitle}>Produtos em Destaque</Text>
      <FlatList<Produto>
        data={api}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.produtosContainer}
        columnWrapperStyle={numColumns > 1 ? { justifyContent: 'space-between', marginBottom: 15 } : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingHorizontal: 10 },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
    elevation: 2
  },
  logo: { fontSize: 22, fontWeight: "bold", color: "#007BFF" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10, color: "#333" },
  produtosContainer: { paddingBottom: 20 },
  produtoCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginHorizontal: 5,
    elevation: 2
  },
  produtoImagem: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 5,
  },
  produtoNome: { fontSize: 16, fontWeight: "bold", color: "#333" },
  produtoDescricao: { fontSize: 14, color: "#555", marginBottom: 5 },
  produtoPreco: { fontSize: 14, fontWeight: "bold", color: "#007BFF" },

  // Menu
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menu: {
    width: '70%',
    maxWidth: 300,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    elevation: 5,
  },
  menuText: { fontSize: 16, color: '#007BFF', marginVertical: 10 },
  menuItem: { marginBottom: 5 },
});

export default Index;
