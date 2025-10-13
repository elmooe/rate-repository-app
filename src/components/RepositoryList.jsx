import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker'
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  picker: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 0,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
  },
  search: {
    backgroundColor: theme.colors.backgroundPrimary,
    margin: 10,
    borderRadius: 5,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortOptions = ({ order, setOrder, search, setSearch }) => {
  return (
    <View style={{backgroundColor: theme.colors.backgroundSecondary}}>
    <Searchbar style={styles.search}
        placeholder="Search"
        onChangeText={(query) => setSearch(query)}
        value={search}
      />
      <Picker style={styles.picker}
        selectedValue={order}
        onValueChange={(itemValue) => setOrder(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({ 
  order, 
  setOrder, 
  search, 
  setSearch, 
  repositories, 
  navigateTo, 
  onEndReach, 
  onEndReachedThreshold 
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigateTo(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={
        <SortOptions 
          order={order} 
          setOrder={setOrder} 
          search={search} 
          setSearch={setSearch} 
        />
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={onEndReachedThreshold}
    />
  );
}

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const [search, setSearch] = useState("");
  const [debounce] = useDebounce(search, 500);
  const navigate = useNavigate();
  const { repositories, fetchMore } = useRepositories({
    order,
    first: 7,
    search: debounce
  });

  const onEndReach = () => {
    fetchMore();
  };

  const navigateTo = (id) => {
    navigate(`/${id}`);
  }

  return (
    <RepositoryListContainer 
      order={order} 
      setOrder={setOrder} 
      search={search} 
      setSearch={setSearch} 
      repositories={repositories} 
      navigateTo={navigateTo}
      onEndReach={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryList;