export const getFinalStep = (routes, steps = []) => {
  if (steps.length === 0) {
    return routes;
  }
  let lastRoute = routes;
  const currentSteps = [];

  steps.forEach((step) => {
    if (!lastRoute) {
      return console.log('No route');
    }

    const stepRoute = lastRoute[step];

    currentSteps.push(step);
    lastRoute = stepRoute;
  });

  return lastRoute;
};
