async function getData() {
  const api = new API({
		key: "1e19898c87464e239192c8bfe422f280"
	});

  const requests = await api.createPromise('search/nederlands')
    .then(data => {
      console.log(data)
    })
}

export { getData }
