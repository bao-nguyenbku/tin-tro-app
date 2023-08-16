const formatCurrency = (number) => {
  return number;
}
// eslint-disable-next-line consistent-return
const disableBottomTabBar = (navigation, options = {}) => {
  const { action = 'disable' } = options;
  if (action === 'disable') {
    return navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  }
  if (action === 'clean') {
    return navigation.getParent()?.setOptions({
      tabBarStyle: undefined,
    });
  }
};

export { formatCurrency, disableBottomTabBar };
