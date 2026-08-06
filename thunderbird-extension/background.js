messenger.action.onClicked.addListener(async () => {
  const generatorUrl = messenger.runtime.getURL("generator.html");
  const tabs = await messenger.tabs.query({});
  const existingTab = tabs.find((tab) => tab.url === generatorUrl);

  if (existingTab) {
    await messenger.tabs.update(existingTab.id, { active: true });
    return;
  }

  await messenger.tabs.create({ url: generatorUrl });
});
