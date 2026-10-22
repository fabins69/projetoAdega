import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const C = {
  bg: "#160D10",
  card: "#26161C",
  card2: "#321D25",
  burgundy: "#501C2A",
  gold: "#E6B84A",
  white: "#FFFFFF",
  muted: "#B9A9AE",
  border: "#49313A",
  danger: "#FF7272",
  green: "#6BCB91",
};

const PRODUCTS = [
  {
    id: "1",
    name: "Vinho Tinto",
    brand: "Casillero del Diablo",
    volume: "750 ml",
    category: "Vinhos",
    price: 69.9,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800",
    description:
      "Vinho tinto de sabor marcante, ideal para acompanhar refeições e ocasiões especiais.",
  },
  {
    id: "2",
    name: "Vinho Rosé",
    brand: "Concha y Toro",
    volume: "750 ml",
    category: "Vinhos",
    price: 49.9,
    image:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800",
    description:
      "Vinho rosé refrescante, com perfil leve para encontros e momentos descontraídos.",
  },
  {
    id: "3",
    name: "Espumante Brut",
    brand: "Casa Perini",
    volume: "750 ml",
    category: "Espumantes",
    price: 59.9,
    image:
      "https://images.unsplash.com/photo-1594372365401-3b5b5e4fd4c8?w=800",
    description:
      "Espumante elegante para comemorações, brindes e celebrações especiais.",
  },
  {
    id: "4",
    name: "Whisky",
    brand: "Johnnie Walker",
    volume: "1 L",
    category: "Whisky",
    price: 139.9,
    image:
      "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800",
    description:
      "Whisky de aroma intenso, indicado para apreciar puro ou em coquetéis.",
  },
  {
    id: "5",
    name: "Gin",
    brand: "Beefeater",
    volume: "750 ml",
    category: "Gin",
    price: 99.9,
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800",
    description:
      "Gin com notas botânicas, ótimo para preparar diferentes tipos de drinks.",
  },
  {
    id: "6",
    name: "Vodka",
    brand: "Absolut",
    volume: "750 ml",
    category: "Vodka",
    price: 89.9,
    image:
      "https://images.unsplash.com/photo-1607622750671-6cd9a99eabd9?w=800",
    description:
      "Vodka versátil para coquetéis e receitas de bebidas.",
  },
  {
    id: "7",
    name: "Cerveja Pilsen",
    brand: "Heineken",
    volume: "350 ml",
    category: "Cervejas",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800",
    description:
      "Cerveja do tipo pilsen para momentos de descontração.",
  },
  {
    id: "8",
    name: "Cerveja Premium",
    brand: "Stella Artois",
    volume: "330 ml",
    category: "Cervejas",
    price: 6.99,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=800",
    description:
      "Cerveja premium com sabor equilibrado, ideal para acompanhar petiscos.",
  },
  {
    id: "9",
    name: "Vinho Branco",
    brand: "Santa Helena",
    volume: "750 ml",
    category: "Vinhos",
    price: 44.9,
    image:
      "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800",
    description:
      "Vinho branco de perfil leve, indicado para acompanhar refeições e encontros.",
  },
  {
    id: "10",
    name: "Espumante Moscatel",
    brand: "Garibaldi",
    volume: "750 ml",
    category: "Espumantes",
    price: 39.9,
    image:
      "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=800",
    description:
      "Espumante aromático e adocicado para celebrações e ocasiões especiais.",
  },
  {
    id: "11",
    name: "Whisky Bourbon",
    brand: "Jim Beam",
    volume: "1 L",
    category: "Whisky",
    price: 119.9,
    image:
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
    description:
      "Bourbon com notas amadeiradas e sabor característico.",
  },
  {
    id: "12",
    name: "Gin London Dry",
    brand: "Gordon's",
    volume: "750 ml",
    category: "Gin",
    price: 79.9,
    image:
      "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800",
    description:
      "Gin clássico para preparar drinks com frutas, especiarias e água tônica.",
  },
];

const CATEGORIES = [
  "Todos",
  "Cervejas",
  "Vinhos",
  "Whisky",
  "Gin",
  "Vodka",
  "Espumantes",
];

const money = (value) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

function validCPF(value) {
  const cpf = value.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += Number(cpf[i]) * (10 - i);
  }

  let digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;

  if (digit !== Number(cpf[9])) return false;

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += Number(cpf[i]) * (11 - i);
  }

  digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;

  return digit === Number(cpf[10]);
}

function isAdult(date) {
  if (!date || !/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return false;

  const [day, month, year] = date.split("/").map(Number);
  const birth = new Date(year, month - 1, day);

  if (
    birth.getFullYear() !== year ||
    birth.getMonth() !== month - 1 ||
    birth.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  let age = today.getFullYear() - year;

  if (
    today.getMonth() < month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() < day)
  ) {
    age--;
  }

  return age >= 18 && birth <= today;
}

function Button({ title, onPress, secondary = false, disabled = false }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        secondary && styles.buttonSecondary,
        disabled && styles.buttonDisabled,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          secondary && styles.buttonSecondaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  multiline,
}) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || label}
        placeholderTextColor={C.muted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType || "default"}
        multiline={multiline}
        style={[styles.input, multiline && styles.multilineInput]}
        autoCapitalize={keyboardType === "email-address" ? "none" : "sentences"}
      />
    </View>
  );
}

function ProductCard({ product, favorite, onFavorite, onPress, onAdd }) {
  return (
    <View style={styles.productCard}>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={onFavorite}
        accessibilityLabel={
          favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
      >
        <Text style={styles.favoriteIcon}>{favorite ? "♥" : "♡"}</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
        <Image
          source={{ uri: product.image }}
          style={styles.productPhoto}
          resizeMode="cover"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productCategory}>{product.category}</Text>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.productMeta} numberOfLines={1}>
            {product.brand} · {product.volume}
          </Text>
          <Text style={styles.productPrice}>{money(product.price)}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Text style={styles.addButtonText}>+ Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState("age");
  const [authMode, setAuthMode] = useState("login");

  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [demoAccounts, setDemoAccounts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [checkoutStep, setCheckoutStep] = useState(0);
  const [fulfillment, setFulfillment] = useState("Entrega");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Pix");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryFee] = useState(7);
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const [activeTab, setActiveTab] = useState("Início");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const fee = fulfillment === "Entrega" && cart.length > 0 ? deliveryFee : 0;
  const total = subtotal + fee;

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const term = search.toLowerCase().trim();

      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.volume.toLowerCase().includes(term);

      const matchesCategory =
        category === "Todos" || product.category === category;

      const matchesFavorite =
        activeTab !== "Favoritos" || favorites.includes(product.id);

      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [search, category, activeTab, favorites]);

  function showMessage(message) {
    Alert.alert("FAJA ADEGA", message);
  }

  function enterCatalog() {
    if (!ageConfirmed || !isAdult(birthDate)) {
      showMessage("É necessário confirmar que você tem 18 anos ou mais.");
      return;
    }

    if (!validCPF(cpf)) {
      showMessage("Informe um CPF válido para continuar.");
      return;
    }

    setScreen("auth");
  }

  function register() {
    if (!name.trim() || !email.trim() || password.length < 6) {
      showMessage(
        "Preencha nome, e-mail e senha. A senha deve ter pelo menos 6 caracteres."
      );
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (demoAccounts.some((account) => account.email === normalizedEmail)) {
      showMessage("Já existe uma conta demonstrativa com esse e-mail.");
      return;
    }

    const account = {
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    setDemoAccounts((old) => [...old, account]);
    setUser({ name: account.name, email: account.email });
    setScreen("catalog");
    setActiveTab("Início");
  }

  function login() {
    const normalizedEmail = email.trim().toLowerCase();

    const account = demoAccounts.find(
      (item) =>
        item.email === normalizedEmail && item.password === password
    );

    if (!account) {
      showMessage(
        "Não encontramos essa conta na demonstração. Cadastre-se ou use os dados da conta criada nesta sessão."
      );
      return;
    }

    setUser({ name: account.name, email: account.email });
    setScreen("catalog");
    setActiveTab("Início");
  }

  function logout() {
    setUser(null);
    setPassword("");
    setScreen("auth");
    setAuthMode("login");
  }

  function toggleFavorite(productId) {
    setFavorites((old) =>
      old.includes(productId)
        ? old.filter((id) => id !== productId)
        : [...old, productId]
    );
  }

  function addToCart(product) {
    setCart((old) => {
      const existing = old.find((item) => item.id === product.id);

      if (existing) {
        return old.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...old, { ...product, quantity: 1 }];
    });

    showMessage(`${product.name} foi adicionado ao carrinho.`);
  }

  function changeQuantity(productId, amount) {
    setCart((old) =>
      old
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function startCheckout() {
    if (!cart.length) {
      showMessage("Seu carrinho está vazio.");
      return;
    }

    setCheckoutStep(0);
    setScreen("checkout");
  }

  function finishOrder() {
    if (!user) {
      showMessage("Entre na sua conta antes de finalizar o pedido.");
      setScreen("auth");
      return;
    }

    if (!customerPhone.trim()) {
      showMessage("Informe um telefone para contato.");
      setCheckoutStep(0);
      return;
    }

    if (fulfillment === "Entrega" && !address.trim()) {
      showMessage("Informe o endereço de entrega.");
      setCheckoutStep(1);
      return;
    }

    const order = {
      id: `FAJA-${Date.now().toString().slice(-8)}`,
      date: new Date().toLocaleString("pt-BR"),
      items: cart.map((item) => ({ ...item })),
      subtotal,
      fee,
      total,
      fulfillment,
      address: fulfillment === "Entrega" ? address : "Retirada na loja",
      payment,
      status: "Pedido demonstrativo recebido",
    };

    setOrders((old) => [order, ...old]);
    setCurrentOrder(order);
    setCart([]);
    setScreen("orderSuccess");
  }

  function goToTab(tab) {
    setActiveTab(tab);

    if (tab === "Carrinho") {
      setScreen("cart");
    } else if (tab === "Favoritos") {
      setScreen("catalog");
    } else if (tab === "Pedidos") {
      setScreen("orders");
    } else if (tab === "Perfil") {
      setScreen("profile");
    } else {
      setScreen("catalog");
    }
  }

  function backToCatalog() {
    setScreen("catalog");
    setActiveTab("Início");
    setSelectedProduct(null);
  }

  function renderHeader(title, back = true) {
    return (
      <View style={styles.header}>
        {back ? (
          <TouchableOpacity
            onPress={() => {
              if (screen === "productDetails") {
                backToCatalog();
              } else if (screen === "checkout") {
                setScreen("cart");
              } else {
                backToCatalog();
              }
            }}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.headerSpacer} />
        )}

        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>FAJA ADEGA</Text>
        </View>

        <TouchableOpacity
          style={styles.headerCart}
          onPress={() => {
            setScreen("cart");
            setActiveTab("Carrinho");
          }}
        >
          <Text style={styles.headerCartText}>🛒</Text>
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  function renderBottomNav() {
    const tabs = [
      { name: "Início", icon: "⌂" },
      { name: "Favoritos", icon: "♡" },
      { name: "Carrinho", icon: "🛒" },
      { name: "Pedidos", icon: "▤" },
      { name: "Perfil", icon: "♙" },
    ];

    return (
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const selected =
            activeTab === tab.name ||
            (tab.name === "Início" && screen === "catalog");

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.navItem}
              onPress={() => goToTab(tab.name)}
            >
              <Text
                style={[
                  styles.navIcon,
                  selected && styles.navSelected,
                ]}
              >
                {tab.icon}
              </Text>
              <Text
                style={[
                  styles.navLabel,
                  selected && styles.navSelected,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // TELA DE VERIFICAÇÃO DE IDADE
  if (screen === "age") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={C.bg} />
        <ScrollView contentContainerStyle={styles.centerScreen}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>FJ</Text>
          </View>

          <Text style={styles.brandTitle}>FAJA ADEGA</Text>
          <Text style={styles.brandSubtitle}>
            Bebidas e conveniência
          </Text>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Verificação de idade</Text>
            <Text style={styles.mutedText}>
              A venda de bebidas alcoólicas é proibida para menores de 18
              anos. Confirme sua idade para continuar.
            </Text>

            <Field
              label="Data de nascimento"
              value={birthDate}
              onChangeText={setBirthDate}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
            />

            <Field
              label="CPF"
              value={cpf}
              onChangeText={setCpf}
              placeholder="Somente para a demonstração"
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.checkRow}
              onPress={() => setAgeConfirmed((old) => !old)}
            >
              <View
                style={[
                  styles.checkbox,
                  ageConfirmed && styles.checkboxChecked,
                ]}
              >
                {ageConfirmed && <Text style={styles.checkboxTick}>✓</Text>}
              </View>
              <Text style={styles.checkText}>
                Confirmo que tenho 18 anos ou mais.
              </Text>
            </TouchableOpacity>

            <Button title="Continuar" onPress={enterCatalog} />

            <Text style={styles.smallNotice}>
              Esta tela realiza somente verificações locais demonstrativas.
              Ela não verifica a identidade em bases oficiais.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // TELA DE LOGIN E CADASTRO
  if (screen === "auth") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={C.bg} />
        <ScrollView contentContainerStyle={styles.centerScreen}>
          <TouchableOpacity onPress={() => setScreen("age")}>
            <Text style={styles.backLink}>‹ Voltar</Text>
          </TouchableOpacity>

          <View style={styles.logoCircleSmall}>
            <Text style={styles.logoIcon}>FJ</Text>
          </View>

          <Text style={styles.brandTitle}>FAJA ADEGA</Text>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>
              {authMode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
            </Text>

            {authMode === "register" && (
              <Field
                label="Nome completo"
                value={name}
                onChangeText={setName}
                placeholder="Seu nome"
              />
            )}

            <Field
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              placeholder="voce@email.com"
              keyboardType="email-address"
            />

            <Field
              label="Senha"
              value={password}
              onChangeText={setPassword}
              placeholder="Mínimo de 6 caracteres"
              secureTextEntry
            />

            <Button
              title={authMode === "login" ? "Entrar" : "Criar conta"}
              onPress={authMode === "login" ? login : register}
            />

            <TouchableOpacity
              style={styles.switchAuth}
              onPress={() => setAuthMode(authMode === "login" ? "register" : "login")}
            >
              <Text style={styles.switchAuthText}>
                {authMode === "login"
                  ? "Ainda não tem conta? Cadastre-se"
                  : "Já tem uma conta? Faça login"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.smallNotice}>
              Conta demonstrativa: os dados são mantidos apenas durante esta
              sessão do aplicativo.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // TELA DE DETALHES DO PRODUTO
  if (screen === "productDetails" && selectedProduct) {
    const favorite = favorites.includes(selectedProduct.id);

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={C.bg} />
        {renderHeader("Detalhes do produto")}

        <ScrollView contentContainerStyle={styles.pageContent}>
          <View style={styles.detailPhotoWrap}>
            <Image
              source={{ uri: selectedProduct.image }}
              style={styles.detailPhoto}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.detailFavorite}
              onPress={() => toggleFavorite(selectedProduct.id)}
            >
              <Text style={styles.favoriteIcon}>
                {favorite ? "♥" : "♡"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailContent}>
            <Text style={styles.productCategory}>
              {selectedProduct.category}
            </Text>
            <Text style={styles.detailTitle}>{selectedProduct.name}</Text>
            <Text style={styles.detailBrand}>
              {selectedProduct.brand} · {selectedProduct.volume}
            </Text>
            <Text style={styles.detailPrice}>
              {money(selectedProduct.price)}
            </Text>

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>Sobre o produto</Text>
            <Text style={styles.detailDescription}>
              {selectedProduct.description}
            </Text>

            <Text style={styles.smallNotice}>
              Imagem ilustrativa. Confira a embalagem e as informações do
              produto antes da compra.
            </Text>

            <Button
              title="Adicionar ao carrinho"
              onPress={() => addToCart(selectedProduct)}
            />
            <Button
              title="Voltar para os produtos"
              secondary
              onPress={backToCatalog}
            />
          </View>
        </ScrollView>
        {renderBottomNav()}
      </SafeAreaView>
    );
  }

  // CATÁLOGO
  if (screen === "catalog") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={C.bg} />

        {renderHeader("Catálogo", false)}

        <ScrollView
          contentContainerStyle={styles.catalogContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.welcomeBanner}>
            <Text style={styles.welcomeSmall}>BEM-VINDO À</Text>
            <Text style={styles.welcomeTitle}>FAJA ADEGA</Text>
            <Text style={styles.welcomeDescription}>
              Encontre seus produtos favoritos em um só lugar.
            </Text>
          </View>

          <Field
            label="Pesquisar produtos"
            value={search}
            onChangeText={setSearch}
            placeholder="Digite nome, marca ou categoria..."
          />

          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>Categorias</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesRow}
          >
            {CATEGORIES.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setCategory(item)}
                style={[
                  styles.categoryChip,
                  category === item && styles.categoryChipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    category === item && styles.categoryChipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>
              {activeTab === "Favoritos" ? "Meus favoritos" : "Produtos"}
            </Text>
            <Text style={styles.mutedText}>
              {filteredProducts.length} item(ns)
            </Text>
          </View>

          {filteredProducts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>⌕</Text>
              <Text style={styles.emptyTitle}>Nenhum produto encontrado</Text>
              <Text style={styles.mutedText}>
                Tente outra busca ou selecione uma categoria diferente.
              </Text>
              <Button
                title="Limpar filtros"
                secondary
                onPress={() => {
                  setSearch("");
                  setCategory("Todos");
                }}
              />
            </View>
          ) : (
            <View style={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <View key={product.id} style={styles.gridItem}>
                  <ProductCard
                    product={product}
                    favorite={favorites.includes(product.id)}
                    onFavorite={() => toggleFavorite(product.id)}
                    onPress={() => {
                      setSelectedProduct(product);
                      setScreen("productDetails");
                    }}
                    onAdd={() => addToCart(product)}
                  />
                </View>
              ))}
            </View>
          )}

          <Text style={styles.smallNotice}>
            Catálogo ilustrativo. Preços, disponibilidade e imagens precisam
            ser confirmados antes de disponibilizar a loja ao público.
          </Text>
        </ScrollView>

        {renderBottomNav()}
      </SafeAreaView>
    );
  }

  // CARRINHO
  if (screen === "cart") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={C.bg} />
        {renderHeader("Meu carrinho")}

        <ScrollView contentContainerStyle={styles.pageContent}>
          {cart.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🛒</Text>
              <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>
              <Text style={styles.mutedText}>
                Adicione produtos para começar seu pedido.
              </Text>
              <Button title="Ver produtos" onPress={backToCatalog} />
            </View>
          ) : (
            <>
              {cart.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.cartProductPhoto}
                    resizeMode="cover"
                  />

                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.productMeta}>{item.brand}</Text>
                    <Text style={styles.productPrice}>{money(item.price)}</Text>

                    <View style={styles.quantityRow}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => changeQuantity(item.id, -1)}
                      >
                        <Text style={styles.quantityButtonText}>−</Text>
                      </TouchableOpacity>

                      <Text style={styles.quantityValue}>{item.quantity}</Text>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => changeQuantity(item.id, 1)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      setCart((old) => old.filter((p) => p.id !== item.id))
                    }
                  >
                    <Text style={styles.removeText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.summaryCard}>
                <Text style={styles.sectionTitle}>Resumo do pedido</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>{money(subtotal)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>
                    Entrega (estimativa)
                  </Text>
                  <Text style={styles.summaryValue}>
                    {money(deliveryFee)}
                  </Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total estimado</Text>
                  <Text style={styles.totalValue}>{money(subtotal + deliveryFee)}</Text>
                </View>
                <Text style={styles.smallNotice}>
                  A taxa final pode depender do endereço. A entrega será
                  calculada novamente na finalização.
                </Text>
              </View>

              <Button title="Continuar para finalizar" onPress={startCheckout} />
              <Button
                title="Continuar comprando"
                secondary
                onPress={backToCatalog}
              />
            </>
          )}
        </ScrollView>
        {renderBottomNav()}
      </SafeAreaView>
    );
  }

  // FINALIZAÇÃO DO PEDIDO
  if (screen === "checkout") {
    const steps = ["Contato", "Entrega", "Pagamento", "Revisão"];

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={C.bg} />
        {renderHeader("Finalizar pedido")}

        <ScrollView contentContainerStyle={styles.pageContent}>
          <View style={styles.stepRow}>
            {steps.map((step, index) => (
              <TouchableOpacity
                key={step}
                onPress={() => {
                  if (index <= checkoutStep) setCheckoutStep(index);
                }}
                style={styles.stepItem}
              >
                <View
                  style={[
                    styles.stepCircle,
                    index <= checkoutStep && styles.stepCircleActive,
                  ]}
                >
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    index === checkoutStep && styles.stepLabelActive,
                  ]}
                >
                  {step}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.formCard}>
            {checkoutStep === 0 && (
              <>
                <Text style={styles.sectionTitle}>Dados para contato</Text>
                <Text style={styles.mutedText}>
                  Olá, {user?.name || "cliente"}. Confirme seu telefone.
                </Text>
                <Field
                  label="Telefone"
                  value={customerPhone}
                  onChangeText={setCustomerPhone}
                  placeholder="(00) 00000-0000"
                  keyboardType="phone-pad"
                />
                <Button
                  title="Continuar"
                  onPress={() => {
                    if (!customerPhone.trim()) {
                      showMessage("Informe um telefone para contato.");
                      return;
                    }
                    setCheckoutStep(1);
                  }}
                />
              </>
            )}

            {checkoutStep === 1 && (
              <>
                <Text style={styles.sectionTitle}>Como deseja receber?</Text>

                <TouchableOpacity
                  style={[
                    styles.optionCard,
                    fulfillment === "Entrega" && styles.optionSelected,
                  ]}
                  onPress={() => setFulfillment("Entrega")}
                >
                  <Text style={styles.optionTitle}>🚚 Entrega</Text>
                  <Text style={styles.mutedText}>
                    Receba seu pedido no endereço informado.
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.optionCard,
                    fulfillment === "Retirada" && styles.optionSelected,
                  ]}
                  onPress={() => setFulfillment("Retirada")}
                >
                  <Text style={styles.optionTitle}>🏪 Retirada na loja</Text>
                  <Text style={styles.mutedText}>
                    Retire seu pedido no estabelecimento.
                  </Text>
                </TouchableOpacity>

                {fulfillment === "Entrega" && (
                  <Field
                    label="Endereço completo"
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Rua, número, bairro e complemento"
                    multiline
                  />
                )}

                <Button
                  title="Continuar"
                  onPress={() => {
                    if (fulfillment === "Entrega" && !address.trim()) {
                      showMessage("Informe o endereço de entrega.");
                      return;
                    }
                    setCheckoutStep(2);
                  }}
                />
                <Button
                  title="Voltar"
                  secondary
                  onPress={() => setCheckoutStep(0)}
                />
              </>
            )}

            {checkoutStep === 2 && (
              <>
                <Text style={styles.sectionTitle}>Forma de pagamento</Text>
                <Text style={styles.mutedText}>
                  Selecione a forma de pagamento desejada.
                </Text>

                {["Pix", "Cartão de crédito", "Cartão de débito", "Dinheiro"].map(
                  (method) => (
                    <TouchableOpacity
                      key={method}
                      style={[
                        styles.optionCard,
                        payment === method && styles.optionSelected,
                      ]}
                      onPress={() => setPayment(method)}
                    >
                      <Text style={styles.optionTitle}>
                        {payment === method ? "●  " : "○  "}
                        {method}
                      </Text>
                    </TouchableOpacity>
                  )
                )}

                <Text style={styles.smallNotice}>
                  O pagamento ainda não é processado neste aplicativo de
                  demonstração. Não insira dados de cartão.
                </Text>

                <Button
                  title="Continuar para revisão"
                  onPress={() => setCheckoutStep(3)}
                />
                <Button
                  title="Voltar"
                  secondary
                  onPress={() => setCheckoutStep(1)}
                />
              </>
            )}

            {checkoutStep === 3 && (
              <>
                <Text style={styles.sectionTitle}>Revise seu pedido</Text>

                {cart.map((item) => (
                  <View key={item.id} style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>
                      {item.quantity}x {item.name}
                    </Text>
                    <Text style={styles.summaryValue}>
                      {money(item.quantity * item.price)}
                    </Text>
                  </View>
                ))}

                <View style={styles.separator} />

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>{money(subtotal)}</Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Entrega</Text>
                  <Text style={styles.summaryValue}>{money(fee)}</Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>{money(total)}</Text>
                </View>

                <View style={styles.separator} />

                <Text style={styles.summaryLabel}>
                  Recebimento: {fulfillment}
                </Text>
                <Text style={styles.summaryLabel}>
                  Pagamento: {payment}
                </Text>
                {fulfillment === "Entrega" && (
                  <Text style={styles.summaryLabel}>
                    Endereço: {address}
                  </Text>
                )}
                <Text style={styles.summaryLabel}>
                  Telefone: {customerPhone}
                </Text>

                <Button
                  title="Confirmar pedido demonstrativo"
                  onPress={finishOrder}
                />
                <Button
                  title="Voltar"
                  secondary
                  onPress={() => setCheckoutStep(2)}
                />

                <Text style={styles.smallNotice}>
                  Ao confirmar, você criará somente um registro local de
                  demonstração. Nenhum pagamento ou entrega real será
                  solicitado.
                </Text>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // CONFIRMAÇÃO
  if (screen === "orderSuccess" && currentOrder) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={C.bg} />

        <ScrollView contentContainerStyle={styles.centerScreen}>
          <View style={styles.successCircle}>
            <Text style={styles.successCheck}>✓</Text>
          </View>

          <Text style={styles.successTitle}>Pedido registrado!</Text>
          <Text style={styles.mutedText}>
            O pedido foi registrado localmente para fins de demonstração.
          </Text>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Resumo</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Número</Text>
              <Text style={styles.summaryValue}>{currentOrder.id}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Data</Text>
              <Text style={styles.summaryValue}>{currentOrder.date}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Pagamento</Text>
              <Text style={styles.summaryValue}>{currentOrder.payment}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{money(currentOrder.total)}</Text>
            </View>

            <Text style={styles.smallNotice}>
              Nenhuma transação financeira foi realizada.
            </Text>

            <Button
              title="Voltar ao catálogo"
              onPress={() => {
                setScreen("catalog");
                setActiveTab("Início");
              }}
            />
            <Button
              title="Ver meus pedidos"
              secondary
              onPress={() => {
                setScreen("orders");
                setActiveTab("Pedidos");
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // HISTÓRICO DE PEDIDOS
  if (screen === "orders") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={C.bg} />
        {renderHeader("Meus pedidos")}

        <ScrollView contentContainerStyle={styles.pageContent}>
          {orders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>▤</Text>
              <Text style={styles.emptyTitle}>Nenhum pedido ainda</Text>
              <Text style={styles.mutedText}>
                Quando você fizer um pedido demonstrativo, ele aparecerá aqui.
              </Text>
              <Button title="Explorar produtos" onPress={backToCatalog} />
            </View>
          ) : (
            orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderStatus}>Registrado</Text>
                </View>

                <Text style={styles.mutedText}>{order.date}</Text>
                <Text style={styles.summaryLabel}>
                  {order.items.length} tipo(s) de produto
                </Text>
                <Text style={styles.summaryLabel}>
                  {order.fulfillment} · {order.payment}
                </Text>

                <View style={styles.separator} />

                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>{money(order.total)}</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {renderBottomNav()}
      </SafeAreaView>
    );
  }

  // PERFIL
  if (screen === "profile") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={C.bg} />
        {renderHeader("Meu perfil")}

        <ScrollView contentContainerStyle={styles.pageContent}>
          <View style={styles.profileCard}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>
                {(user?.name || "U").charAt(0).toUpperCase()}
              </Text>
            </View>

            <Text style={styles.profileName}>{user?.name || "Usuário"}</Text>
            <Text style={styles.mutedText}>{user?.email || ""}</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.sectionTitle}>Minha conta</Text>

            <TouchableOpacity
              style={styles.profileOption}
              onPress={() => {
                setScreen("orders");
                setActiveTab("Pedidos");
              }}
            >
              <Text style={styles.profileOptionText}>▤  Meus pedidos</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileOption}
              onPress={() => {
                setScreen("catalog");
                setActiveTab("Favoritos");
              }}
            >
              <Text style={styles.profileOptionText}>♡  Meus favoritos</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileOption}
              onPress={() => {
                setScreen("cart");
                setActiveTab("Carrinho");
              }}
            >
              <Text style={styles.profileOptionText}>🛒  Meu carrinho</Text>
              <Text style={styles.optionArrow}>›</Text>
            </TouchableOpacity>

            <Button title="Sair da conta" secondary onPress={logout} />
          </View>

          <Text style={styles.smallNotice}>
            Esta versão não utiliza servidor. Seus dados e pedidos não são
            compartilhados entre dispositivos e podem ser perdidos ao reiniciar
            o aplicativo.
          </Text>
        </ScrollView>

        {renderBottomNav()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.brandTitle}>FAJA ADEGA</Text>
      <Button title="Voltar ao catálogo" onPress={backToCatalog} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bg,
  },

  centerScreen: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    paddingBottom: 35,
  },

  pageContent: {
    padding: 16,
    paddingBottom: 32,
  },

  catalogContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 24,
  },

  logoCircle: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: C.burgundy,
    borderWidth: 2,
    borderColor: C.gold,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  logoCircleSmall: {
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: C.burgundy,
    borderWidth: 2,
    borderColor: C.gold,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    marginBottom: 12,
  },

  logoIcon: {
    color: C.gold,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 2,
  },

  brandTitle: {
    color: C.gold,
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 2,
  },

  brandSubtitle: {
    color: C.muted,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 26,
    fontSize: 14,
  },

  formCard: {
    width: "100%",
    backgroundColor: C.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    padding: 18,
    marginTop: 20,
    gap: 12,
  },

  sectionTitle: {
    color: C.white,
    fontSize: 19,
    fontWeight: "800",
  },

  mutedText: {
    color: C.muted,
    fontSize: 13,
    lineHeight: 20,
  },

  fieldContainer: {
    marginTop: 8,
    gap: 7,
  },

  fieldLabel: {
    color: C.white,
    fontWeight: "700",
    fontSize: 13,
  },

  input: {
    color: C.white,
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 14,
    minHeight: 46,
  },

  multilineInput: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: C.gold,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    minHeight: 48,
  },

  buttonText: {
    color: C.bg,
    fontSize: 14,
    fontWeight: "900",
  },

  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: C.gold,
  },

  buttonSecondaryText: {
    color: C.gold,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 8,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: C.gold,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxChecked: {
    backgroundColor: C.gold,
  },

  checkboxTick: {
    color: C.bg,
    fontWeight: "900",
  },

  checkText: {
    color: C.white,
    flex: 1,
    fontSize: 13,
  },

  smallNotice: {
    color: C.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 12,
  },

  switchAuth: {
    alignItems: "center",
    paddingVertical: 10,
  },

  switchAuthText: {
    color: C.gold,
    fontWeight: "700",
    fontSize: 13,
    textAlign: "center",
  },

  backLink: {
    color: C.gold,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  header: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    gap: 8,
  },

  backButton: {
    width: 38,
    height: 42,
    justifyContent: "center",
  },

  backButtonText: {
    color: C.gold,
    fontSize: 36,
    lineHeight: 40,
  },

  headerSpacer: {
    width: 38,
  },

  headerTitleWrap: {
    flex: 1,
    alignItems: "center",
  },

  headerTitle: {
    color: C.white,
    fontWeight: "800",
    fontSize: 17,
  },

  headerSubtitle: {
    color: C.gold,
    fontWeight: "800",
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 3,
  },

  headerCart: {
    width: 40,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  headerCartText: {
    fontSize: 21,
  },

  cartBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: C.gold,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },

  cartBadgeText: {
    color: C.bg,
    fontSize: 10,
    fontWeight: "900",
  },

  welcomeBanner: {
    backgroundColor: C.burgundy,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: C.gold,
    padding: 20,
    marginBottom: 16,
  },

  welcomeSmall: {
    color: C.gold,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },

  welcomeTitle: {
    color: C.white,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 5,
  },

  welcomeDescription: {
    color: "#F0DDE2",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },

  sectionHeadingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 10,
    gap: 8,
  },

  categoriesRow: {
    gap: 8,
    paddingVertical: 4,
    paddingRight: 10,
  },

  categoryChip: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  categoryChipSelected: {
    backgroundColor: C.gold,
    borderColor: C.gold,
  },

  categoryChipText: {
    color: C.white,
    fontSize: 12,
    fontWeight: "700",
  },

  categoryChipTextSelected: {
    color: C.bg,
  },

  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },

  gridItem: {
    width: "50%",
    padding: 5,
  },

  productCard: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
    paddingBottom: 10,
    position: "relative",
  },

  favoriteButton: {
    position: "absolute",
    zIndex: 2,
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(22,13,16,0.88)",
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteIcon: {
    color: C.gold,
    fontSize: 23,
    fontWeight: "700",
  },

  productPhoto: {
    width: "100%",
    height: 145,
    backgroundColor: C.card2,
  },

  productInfo: {
    paddingHorizontal: 10,
    paddingTop: 10,
    minHeight: 116,
  },

  productCategory: {
    color: C.gold,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  productName: {
    color: C.white,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 5,
    minHeight: 36,
  },

  productMeta: {
    color: C.muted,
    fontSize: 10,
    marginTop: 5,
  },

  productPrice: {
    color: C.gold,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 8,
  },

  addButton: {
    marginHorizontal: 9,
    marginTop: 8,
    borderWidth: 1,
    borderColor: C.gold,
    borderRadius: 9,
    paddingVertical: 9,
    alignItems: "center",
  },

  addButtonText: {
    color: C.gold,
    fontWeight: "800",
    fontSize: 12,
  },

  detailPhotoWrap: {
    height: 280,
    backgroundColor: C.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
    position: "relative",
  },

  detailPhoto: {
    width: "100%",
    height: "100%",
  },

  detailFavorite: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: C.bg,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },

  detailContent: {
    paddingTop: 20,
  },

  detailTitle: {
    color: C.white,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 7,
  },

  detailBrand: {
    color: C.muted,
    fontSize: 14,
    marginTop: 7,
  },

  detailPrice: {
    color: C.gold,
    fontSize: 26,
    fontWeight: "900",
    marginTop: 14,
  },

  detailDescription: {
    color: "#E5DADF",
    fontSize: 14,
    lineHeight: 23,
    marginTop: 8,
    marginBottom: 8,
  },

  separator: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 15,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 26,
    marginTop: 30,
    backgroundColor: C.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    gap: 10,
  },

  emptyIcon: {
    fontSize: 42,
    color: C.gold,
  },

  emptyTitle: {
    color: C.white,
    fontWeight: "800",
    fontSize: 17,
    textAlign: "center",
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 10,
    marginBottom: 12,
  },

  cartProductPhoto: {
    width: 82,
    height: 100,
    borderRadius: 12,
    backgroundColor: C.card2,
  },

  cartItemInfo: {
    flex: 1,
    minWidth: 0,
  },

  cartItemName: {
    color: C.white,
    fontWeight: "800",
    fontSize: 14,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 9,
  },

  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: C.burgundy,
    alignItems: "center",
    justifyContent: "center",
  },

  quantityButtonText: {
    color: C.gold,
    fontSize: 20,
    fontWeight: "900",
  },

  quantityValue: {
    color: C.white,
    fontSize: 14,
    fontWeight: "800",
  },

  removeText: {
    color: C.danger,
    fontSize: 10,
    fontWeight: "700",
  },

  summaryCard: {
    backgroundColor: C.card,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginTop: 10,
    marginBottom: 14,
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 10,
  },

  summaryLabel: {
    color: C.muted,
    fontSize: 13,
    flex: 1,
  },

  summaryValue: {
    color: C.white,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "right",
    flexShrink: 1,
  },

  totalLabel: {
    color: C.white,
    fontSize: 15,
    fontWeight: "900",
    flex: 1,
  },

  totalValue: {
    color: C.gold,
    fontSize: 19,
    fontWeight: "900",
    textAlign: "right",
  },

  bottomNav: {
    minHeight: 66,
    flexDirection: "row",
    backgroundColor: C.card,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 8,
    paddingBottom: 5,
    justifyContent: "space-around",
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  navIcon: {
    color: C.muted,
    fontSize: 20,
    fontWeight: "800",
  },

  navLabel: {
    color: C.muted,
    fontSize: 9,
    fontWeight: "700",
  },

  navSelected: {
    color: C.gold,
  },

  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  stepItem: {
    alignItems: "center",
    flex: 1,
    gap: 6,
  },

  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.card,
  },

  stepCircleActive: {
    backgroundColor: C.gold,
    borderColor: C.gold,
  },

  stepNumber: {
    color: C.bg,
    fontSize: 12,
    fontWeight: "900",
  },

  stepLabel: {
    color: C.muted,
    fontSize: 10,
  },

  stepLabelActive: {
    color: C.gold,
    fontWeight: "800",
  },

  optionCard: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 13,
    marginTop: 9,
    backgroundColor: C.bg,
  },

  optionSelected: {
    borderColor: C.gold,
    backgroundColor: C.card2,
  },

  optionTitle: {
    color: C.white,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4,
  },

  successCircle: {
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: C.green,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 18,
  },

  successCheck: {
    color: C.bg,
    fontSize: 46,
    fontWeight: "900",
  },

  successTitle: {
    color: C.gold,
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
  },

  orderCard: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 15,
    marginBottom: 13,
  },

  orderId: {
    color: C.gold,
    fontWeight: "900",
    fontSize: 14,
  },

  orderStatus: {
    color: C.green,
    fontSize: 11,
    fontWeight: "800",
  },

  profileCard: {
    alignItems: "center",
    padding: 25,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
  },

  profileAvatar: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: C.burgundy,
    borderWidth: 2,
    borderColor: C.gold,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  profileAvatarText: {
    color: C.gold,
    fontSize: 30,
    fontWeight: "900",
  },

  profileName: {
    color: C.white,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 5,
  },

  profileOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },

  profileOptionText: {
    color: C.white,
    fontSize: 14,
    fontWeight: "700",
  },

  optionArrow: {
    color: C.gold,
    fontSize: 25,
  },
});