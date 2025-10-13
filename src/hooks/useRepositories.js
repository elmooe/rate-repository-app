import {useQuery} from "@apollo/client/react";
import {GET_REPOSITORIES} from "../graphql/queries";

const orderConfigs = {
  latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
};

const useRepositories = ({ order, first, search }) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: { 
      ...orderConfigs[order],
      first,
      searchKeyword: search
    },
    fetchPolicy: "cache-and-network"
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...orderConfigs[order],
        searchKeyword: search,
        first,
      },
    });
  };

  return {
    repositories: data?.repositories,
    loading,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;