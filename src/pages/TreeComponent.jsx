import React, { useMemo, useState, useEffect, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generateTree } from '../redux/actions/index';
import Loader from '../components/Loader';
import AdminSidebar from '../components/AdminSidebar';
import Bar from '../components/Bar';
import { Box, Stack } from '@chakra-ui/layout';

const Tree = lazy(() => import('react-d3-tree'));

const TreeComponent = () => {
  const [treeData, setTreeData] = useState({
    name: 'Root',
    attributes: {
      rank: 'Owner',
    },
    children: [],
  });
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const {tree} = useSelector((state) => state.tree);
  const loading = useSelector((state) => state.user.loading);
  const treeLoading = useSelector((state) => state.tree.loading);

  const MemoizedTree = useMemo(
	() =>
	  React.memo(({ data }) => (
		<Tree
		  data={data}
		  orientation={'vertical'}
		  allowForeignObjects
		  rootNodeClassName="node__root"
		  branchNodeClassName="node__branch"
		  leafNodeClassName="node__leaf"
		  // eslint-disable-next-line no-unused-vars
		  nodeLabelComponent={({ nodeDatum }) => <CardSO />}
		  pathFunc="step"
		  translate={{ x: '500', y: '50' }}
		  pathClassFunc={() => 'custom-link'}
		  initialDepth={0}
		  nodeSize={{
			x: 200,
			y: 200,
		  }}
		  separation={{
			siblings: 1,
			nonSiblings: 1,
		  }}
		/>
	  )),
	[]
  );

  useEffect(() => {
    if (user) {
      dispatch(generateTree(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (tree) {
      setTreeData(tree);
    }
  }, [tree]);

  if (loading || treeLoading) {
    return <Loader />;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="epin">
        <Bar heading="MyTree" />
        <section className="tree">
          <div className="tree__header">
            <h1>Tree Structure</h1>
          </div>
          <div className="tree__content">
            <Stack direction="column" spacing="md">
              <Box w="100%" h="100vh">
                <MemoizedTree data={treeData} />
              </Box>
            </Stack>
          </div>
        </section>
      </main>
    </div>
  );
};



export default TreeComponent;
