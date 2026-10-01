const categoryAnchorMap: Record<string, string> = {
  Combos: "combos",
  Bebidas: "bebidas",
  Calientes: "calientes",
  Postres: "postres",
  Salsas: "salsas",
  "Menu Mediodia": "menu-mediodia",
  "Rolls Especiales": "rolls-especiales",
  "Rolls Clasicos": "rolls-clasicos",
  "Rolls Vegetarianos": "rolls-vegetarianos",
  "Piezas Especiales": "piezas-especiales",
};

export function getCategoryAnchor(category: string) {
  return (
    categoryAnchorMap[category] ??
    category
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

export function getCombosHref(
  products: { category: string; show?: boolean }[],
): string | null {
  const combo = products.find(
    (product) => product.show !== false && /\bcombos?\b/i.test(product.category),
  );

  return combo ? `#${getCategoryAnchor(combo.category)}` : null;
}
