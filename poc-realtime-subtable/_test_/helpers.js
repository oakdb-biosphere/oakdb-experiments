export const printLn = () => console.log("-".repeat(process.stdout.columns));

export const uuid = () => Math.random().toString(16).substring(2, 6);

export function processSubscriptions(subtab, subscriptions) {
  const input = [];

  subscriptions.forEach((sub) => {
    const { op, path, cid, ...options } = sub;
    const connectionId = cid || uuid();

    subtab.add(connectionId, path, options);
    input.push({ id: connectionId, path, options });
  });

  return mapSubscriptionsToPaths(input);
}

export function mapSubscriptionsToPaths(input) {
  const subscriberAtPath = input.reduce((acc, { id, path }) => {
    acc[path] = acc[path] || [];
    acc[path].push(id);
    return acc;
  }, {});
  return subscriberAtPath;
}
