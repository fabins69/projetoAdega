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
      "Vinho rosé refrescante para encontros e momentos descontraídos.",
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
      "Espumante elegante para comemorações e celebrações especiais.",
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
      "Whisky de aroma intenso, indicado para apreciar ou preparar coquetéis.",
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
      "Gin com notas botânicas, ótimo para preparar diferentes drinks.",
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
      "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=800",
    description: "Cerveja do tipo pilsen para momentos de descontração.",
  },
  {
    id: "8",
    name: "Cerveja Premium",
    brand: "Stella Artois",
    volume: "330 ml",
    category: "Cervejas",
    price: 6.99,
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800",
    description:
      "Cerveja premium de sabor equilibrado, ideal para acompanhar petiscos.",
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
    description: "Vinho branco de perfil leve para refeições e encontros.",
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
      "Espumante aromático e adocicado para ocasiões especiais.",
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
    description: "Bourbon com notas amadeiradas e sabor característico.",
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
      "Gin clássico para preparar drinks com frutas e água tônica.",
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

const DELIVERY_RATES = {
  "3": 5,
  "6": 8,
  "10": 12,
};

const money = (value) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

// Formata a data enquanto o usuário digita.
function formatBirthDate(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

// Confere se a data existe e se a pessoa tem pelo menos 18 anos.
function isAdult(value) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;

  const [day, month, year] = value.split("/").map(Number);
  const birth = new Date(year, month - 1, day);

  if (
    birth.getFullYear() !== year ||
    birth.getMonth() !== month - 1 ||
    birth.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (birth > today) return false;

  let age = today.getFullYear() - year;

  if (
    today.getMonth() < month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() < day)
  ) {
    age--;
  }

  return age >= 18;
}

// Validação matemática do CPF.
function validCPF(value) {
  const cpf = value.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

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

function Button({ title, onPress, secondary = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[S.button, secondary && S.buttonSecondary]}
    >
      <Text
        style={[
          S.buttonText,
          secondary && S.buttonSecondaryText,
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
  keyboardType,
  secureTextEntry,
  multiline,
}) {
  return (
    <View style={S.field}>
      <Text style={S.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || label}
        placeholderTextColor={C.muted}
        keyboardType={keyboardType || "default"}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        autoCapitalize={
          keyboardType === "email-address" ? "none" : "sentences"
        }
        style={[S.input, multiline && S.multiline]}
      />
    </View>
  );
}

function ProductCard({
  product,
  favorite,
  onFavorite,
  onOpen,
  onAdd,
}) {
  return (
    <View style={S.productCard}>
      <TouchableOpacity
        onPress={onFavorite}
        style={S.favorite}
      >
        <Text style={S.favoriteText}>
          {favorite ? "♥" : "♡"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpen} activeOpacity={0.85}>
        <Image
          source={{ uri: product.image }}
          style={S.productImage}
          resizeMode="cover"
        />

        <View style={S.productInfo}>
          <Text style={S.categoryLabel}>{product.category}</Text>
          <Text style={S.productName} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={S.meta} numberOfLines={1}>
            {product.brand} · {product.volume}
          </Text>
          <Text style={S.price}>{money(product.price)}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onAdd} style={S.addButton}>
        <Text style={S.addButtonText}>+ Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState("age");

  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const [authMode, setAuthMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("Início");

  const [checkoutStep, setCheckoutStep] = useState(0);
  const [fulfillment, setFulfillment] = useState("Entrega");
  const [deliveryZone, setDeliveryZone] = useState("3");

  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("Presidente Epitácio");
  const [complement, setComplement] = useState("");
  const [reference, setReference] = useState("");

  const [payment, setPayment] = useState("Pix");
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const cartCount = cart.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const subtotal = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const fee =
    cart.length > 0 && fulfillment === "Entrega"
      ? DELIVERY_RATES[deliveryZone]
      : 0;

  const total = subtotal + fee;

  const fullAddress = [
    street.trim(),
    houseNumber.trim() ? `nº ${houseNumber.trim()}` : "",
    neighborhood.trim(),
    city.trim(),
    complement.trim() ? `Complemento: ${complement.trim()}` : "",
    reference.trim() ? `Referência: ${reference.trim()}` : "",
  ]
    .filter(Boolean)
    .join(", ");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        [
          product.name,
          product.brand,
          product.category,
          product.volume,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesCategory =
        category === "Todos" || product.category === category;

      const matchesFavorite =
        activeTab !== "Favoritos" ||
        favorites.includes(product.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFavorite
      );
    });
  }, [search, category, activeTab, favorites]);

  function msg(message) {
    Alert.alert("FAJA ADEGA", message);
  }

  function enterCatalog() {
    if (!ageConfirmed || !isAdult(birthDate)) {
      return msg(
        "Confirme que tem 18 anos ou mais e informe uma data de nascimento válida."
      );
    }

    if (!validCPF(cpf)) {
      return msg("Informe um CPF válido para continuar.");
    }

    setScreen("auth");
  }

  function register() {
    if (
      !name.trim() ||
      !email.trim() ||
      password.length < 6
    ) {
      return msg(
        "Preencha nome, e-mail e senha com pelo menos 6 caracteres."
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (accounts.some((account) => account.email === normalizedEmail)) {
      return msg(
        "Já existe uma conta com esse e-mail nesta sessão."
      );
    }

    setAccounts((old) => [
      ...old,
      {
        name: name.trim(),
        email: normalizedEmail,
        password,
      },
    ]);

    setUser({
      name: name.trim(),
      email: normalizedEmail,
    });

    setScreen("catalog");
    setActiveTab("Início");
  }

  function login() {
    const account = accounts.find(
      (item) =>
        item.email === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!account) {
      return msg(
        "Conta não encontrada nesta sessão. Cadastre-se primeiro."
      );
    }

    setUser({
      name: account.name,
      email: account.email,
    });

    setScreen("catalog");
    setActiveTab("Início");
  }

  function toggleFavorite(id) {
    setFavorites((old) =>
      old.includes(id)
        ? old.filter((item) => item !== id)
        : [...old, id]
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

    msg(`${product.name} adicionado ao carrinho.`);
  }

  function changeQuantity(id, amount) {
    setCart((old) =>
      old
        .map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + amount }
            : product
        )
        .filter((product) => product.quantity > 0)
    );
  }

  function finishOrder() {
    if (!phone.trim()) {
      msg("Informe um telefone para contato.");
      setCheckoutStep(0);
      return;
    }

    if (
      fulfillment === "Entrega" &&
      (!street.trim() ||
        !houseNumber.trim() ||
        !neighborhood.trim() ||
        !city.trim())
    ) {
      msg("Preencha rua, número, bairro e cidade.");
      setCheckoutStep(1);
      return;
    }

    if (cart.length === 0) {
      msg("Seu carrinho está vazio.");
      setScreen("cart");
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
      address:
        fulfillment === "Entrega"
          ? fullAddress
          : "Retirada na loja",
      payment,
      status: "Pedido demonstrativo recebido",
    };

    setOrders((old) => [order, ...old]);
    setCurrentOrder(order);
    setCart([]);
    setScreen("success");
  }

  function tab(tabName) {
    setActiveTab(tabName);

    if (tabName === "Carrinho") {
      setScreen("cart");
    } else if (tabName === "Pedidos") {
      setScreen("orders");
    } else if (tabName === "Perfil") {
      setScreen("profile");
    } else {
      setScreen("catalog");
    }
  }

  function header(title, showBack = true) {
    return (
      <View style={S.header}>
        {showBack ? (
          <TouchableOpacity
            style={S.back}
            onPress={() => {
              if (screen === "details") {
                setScreen("catalog");
              } else if (screen === "checkout") {
                setScreen("cart");
              } else {
                setScreen("catalog");
              }
            }}
          >
            <Text style={S.backText}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 36 }} />
        )}

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={S.headerTitle}>{title}</Text>
          <Text style={S.headerSub}>FAJA ADEGA</Text>
        </View>

        <TouchableOpacity
          style={S.headerCart}
          onPress={() => {
            setScreen("cart");
            setActiveTab("Carrinho");
          }}
        >
          <Text style={{ fontSize: 21 }}>🛒</Text>
          {cartCount > 0 && (
            <View style={S.badge}>
              <Text style={S.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  function bottomNav() {
    const tabs = [
      { name: "Início", icon: "⌂" },
      { name: "Favoritos", icon: "♡" },
      { name: "Carrinho", icon: "🛒" },
      { name: "Pedidos", icon: "▤" },
      { name: "Perfil", icon: "♙" },
    ];

    return (
      <View style={S.nav}>
        {tabs.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={S.navItem}
            onPress={() => tab(item.name)}
          >
            <Text
              style={[
                S.navIcon,
                activeTab === item.name && S.selected,
              ]}
            >
              {item.icon}
            </Text>
            <Text
              style={[
                S.navLabel,
                activeTab === item.name && S.selected,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  // TELA DE VERIFICAÇÃO DE IDADE
  if (screen === "age") {
    return (
      <SafeAreaView style={S.safe}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={C.bg}
        />

        <ScrollView contentContainerStyle={S.center}>
          <View style={S.logo}>
            <Text style={S.logoText}>FJ</Text>
          </View>

          <Text style={S.brand}>FAJA ADEGA</Text>
          <Text style={S.brandSub}>
            Bebidas e conveniência
          </Text>

          <View style={S.form}>
            <Text style={S.section}>
              Verificação de idade
            </Text>

            <Text style={S.muted}>
              A venda de bebidas alcoólicas é proibida para menores
              de 18 anos.
            </Text>

            <Field
              label="Data de nascimento"
              value={birthDate}
              onChangeText={(value) =>
                setBirthDate(formatBirthDate(value))
              }
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
            />

            <Field
              label="CPF"
              value={cpf}
              onChangeText={setCpf}
              placeholder="Digite seu CPF"
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={S.checkRow}
              onPress={() =>
                setAgeConfirmed((value) => !value)
              }
            >
              <View
                style={[
                  S.checkbox,
                  ageConfirmed && S.checked,
                ]}
              >
                {ageConfirmed && (
                  <Text
                    style={{
                      color: C.bg,
                      fontWeight: "900",
                    }}
                  >
                    ✓
                  </Text>
                )}
              </View>

              <Text style={S.checkText}>
                Confirmo que tenho 18 anos ou mais.
              </Text>
            </TouchableOpacity>

            <Button
              title="Continuar"
              onPress={enterCatalog}
            />

            <Text style={S.note}>
              Esta verificação é demonstrativa e não consulta
              bases oficiais. Em produção, implemente uma
              verificação adequada e segura.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // TELA DE LOGIN E CADASTRO
  if (screen === "auth") {
    return (
      <SafeAreaView style={S.safe}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={C.bg}
        />

        <ScrollView contentContainerStyle={S.center}>
          <TouchableOpacity onPress={() => setScreen("age")}>
            <Text style={S.backLink}>‹ Voltar</Text>
          </TouchableOpacity>

          <View style={S.logoSmall}>
            <Text style={S.logoText}>FJ</Text>
          </View>

          <Text style={S.brand}>FAJA ADEGA</Text>

          <View style={S.form}>
            <Text style={S.section}>
              {authMode === "login"
                ? "Bem-vindo de volta"
                : "Crie sua conta"}
            </Text>

            {authMode === "register" && (
              <Field
                label="Nome completo"
                value={name}
                onChangeText={setName}
              />
            )}

            <Field
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="voce@email.com"
            />

            <Field
              label="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Mínimo de 6 caracteres"
            />

            <Button
              title={
                authMode === "login"
                  ? "Entrar"
                  : "Criar conta"
              }
              onPress={
                authMode === "login" ? login : register
              }
            />

            <TouchableOpacity
              onPress={() =>
                setAuthMode((value) =>
                  value === "login" ? "register" : "login"
                )
              }
            >
              <Text style={S.link}>
                {authMode === "login"
                  ? "Ainda não tem conta? Cadastre-se"
                  : "Já tem conta? Faça login"}
              </Text>
            </TouchableOpacity>

            <Text style={S.note}>
              As contas ficam apenas na memória durante esta
              sessão de demonstração. Os dados não são salvos
              em um banco de dados.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // CATÁLOGO
  if (screen === "catalog") {
    return (
      <SafeAreaView style={S.safe}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={C.bg}
        />

        {header("Catálogo", false)}

        <ScrollView contentContainerStyle={S.catalog}>
          <View style={S.banner}>
            <Text style={S.bannerSmall}>BEM-VINDO À</Text>
            <Text style={S.bannerTitle}>FAJA ADEGA</Text>
            <Text style={S.bannerDesc}>
              Encontre seus produtos favoritos em um só lugar.
            </Text>
          </View>

          <Field
            label="Pesquisar produtos"
            value={search}
            onChangeText={setSearch}
            placeholder="Nome, marca ou categoria..."
          />

          <Text
            style={[
              S.section,
              { marginTop: 20, marginBottom: 8 },
            ]}
          >
            Categorias
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {CATEGORIES.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setCategory(item)}
                style={[
                  S.chip,
                  category === item && S.chipOn,
                ]}
              >
                <Text
                  style={[
                    S.chipText,
                    category === item && S.chipTextOn,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={S.sectionRow}>
            <Text style={S.section}>
              {activeTab === "Favoritos"
                ? "Meus favoritos"
                : "Produtos"}
            </Text>
            <Text style={S.muted}>
              {filteredProducts.length} item(ns)
            </Text>
          </View>

          {filteredProducts.length === 0 ? (
            <View style={S.empty}>
              <Text style={S.emptyTitle}>
                Nenhum produto encontrado
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
            <View style={S.grid}>
              {filteredProducts.map((product) => (
                <View key={product.id} style={S.gridItem}>
                  <ProductCard
                    product={product}
                    favorite={favorites.includes(product.id)}
                    onFavorite={() =>
                      toggleFavorite(product.id)
                    }
                    onOpen={() => {
                      setSelectedProduct(product);
                      setScreen("details");
                    }}
                    onAdd={() => addToCart(product)}
                  />
                </View>
              ))}
            </View>
          )}

          <Text style={S.note}>
            Catálogo ilustrativo. Confira preços, disponibilidade
            e imagens antes de usar comercialmente.
          </Text>
        </ScrollView>

        {bottomNav()}
      </SafeAreaView>
    );
  }

  // DETALHES DO PRODUTO
  if (screen === "details" && selectedProduct) {
    return (
      <SafeAreaView style={S.safe}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={C.bg}
        />

        {header("Detalhes do produto")}

        <ScrollView contentContainerStyle={S.page}>
          <View style={S.detailImageWrap}>
            <Image
              source={{ uri: selectedProduct.image }}
              style={S.detailImage}
              resizeMode="contain"
            />

            <TouchableOpacity
              style={S.detailFav}
              onPress={() =>
                toggleFavorite(selectedProduct.id)
              }
            >
              <Text style={S.favoriteText}>
                {favorites.includes(selectedProduct.id)
                  ? "♥"
                  : "♡"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={S.categoryLabel}>
            {selectedProduct.category}
          </Text>

          <Text style={S.detailTitle}>
            {selectedProduct.name}
          </Text>

          <Text style={S.muted}>
            {selectedProduct.brand} · {selectedProduct.volume}
          </Text>

          <Text style={S.detailPrice}>
            {money(selectedProduct.price)}
          </Text>

          <View style={S.separator} />

          <Text style={S.section}>Sobre o produto</Text>

          <Text style={S.description}>
            {selectedProduct.description}
          </Text>

          <Button
            title="Adicionar ao carrinho"
            onPress={() => addToCart(selectedProduct)}
          />

          <Button
            title="Voltar aos produtos"
            secondary
            onPress={() => {
              setScreen("catalog");
              setActiveTab("Início");
            }}
          />
        </ScrollView>

        {bottomNav()}
      </SafeAreaView>
    );
  }

  // CARRINHO
  if (screen === "cart") {
    const cartFee =
      fulfillment === "Retirada"
        ? 0
        : DELIVERY_RATES[deliveryZone];

    return (
      <SafeAreaView style={S.safe}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={C.bg}
        />

        {header("Meu carrinho")}

        <ScrollView contentContainerStyle={S.page}>
          {cart.length === 0 ? (
            <View style={S.empty}>
              <Text style={S.emptyTitle}>
                Seu carrinho está vazio
              </Text>

              <Button
                title="Ver produtos"
                onPress={() => {
                  setScreen("catalog");
                  setActiveTab("Início");
                }}
              />
            </View>
          ) : (
            <>
              {cart.map((product) => (
                <View key={product.id} style={S.cartItem}>
                  <Image
                    source={{ uri: product.image }}
                    style={S.cartImage}
                  />

                  <View style={{ flex: 1 }}>
                    <Text style={S.cartName}>
                      {product.name}
                    </Text>

                    <Text style={S.meta}>
                      {product.brand}
                    </Text>

                    <Text style={S.price}>
                      {money(product.price)}
                    </Text>

                    <View style={S.qtyRow}>
                      <TouchableOpacity
                        style={S.qtyButton}
                        onPress={() =>
                          changeQuantity(product.id, -1)
                        }
                      >
                        <Text style={S.qtyText}>−</Text>
                      </TouchableOpacity>

                      <Text style={S.qty}>
                        {product.quantity}
                      </Text>

                      <TouchableOpacity
                        style={S.qtyButton}
                        onPress={() =>
                          changeQuantity(product.id, 1)
                        }
                      >
                        <Text style={S.qtyText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      setCart((old) =>
                        old.filter(
                          (item) => item.id !== product.id
                        )
                      )
                    }
                  >
                    <Text style={S.remove}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={S.form}>
                <Text style={S.section}>Resumo do pedido</Text>

                <View style={S.summaryRow}>
                  <Text style={S.muted}>Subtotal</Text>
                  <Text style={S.summaryValue}>
                    {money(subtotal)}
                  </Text>
                </View>

                <View style={S.summaryRow}>
                  <Text style={S.muted}>Entrega estimada</Text>
                  <Text style={S.summaryValue}>
                    {money(cartFee)}
                  </Text>
                </View>

                <View style={S.summaryRow}>
                  <Text style={S.totalLabel}>Total estimado</Text>
                  <Text style={S.total}>
                    {money(subtotal + cartFee)}
                  </Text>
                </View>

                <Text style={S.note}>
                  A taxa definitiva é definida na finalização,
                  conforme a faixa selecionada.
                </Text>
              </View>

              <Button
                title="Continuar para finalizar"
                onPress={() => {
                  setCheckoutStep(0);
                  setScreen("checkout");
                }}
              />

              <Button
                title="Continuar comprando"
                secondary
                onPress={() => {
                  setScreen("catalog");
                  setActiveTab("Início");
                }}
              />
            </>
          )}
        </ScrollView>

        {bottomNav()}
      </SafeAreaView>
    );
  }

  // FINALIZAÇÃO DO PEDIDO
  if (screen === "checkout") {
    const steps = [
      "Contato",
      "Entrega",
      "Pagamento",
      "Revisão",
    ];

    return (
      <SafeAreaView style={S.safe}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={C.bg}
        />

        {header("Finalizar pedido")}

        <ScrollView contentContainerStyle={S.page}>
          <View style={S.steps}>
            {steps.map((item, index) => (
              <TouchableOpacity
                key={item}
                style={S.step}
                onPress={() => {
                  if (index <= checkoutStep) {
                    setCheckoutStep(index);
                  }
                }}
              >
                <View
                  style={[
                    S.stepCircle,
                    index <= checkoutStep && S.stepActive,
                  ]}
                >
                  <Text style={S.stepNum}>{index + 1}</Text>
                </View>

                <Text
                  style={[
                    S.stepLabel,
                    index === checkoutStep && {
                      color: C.gold,
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={S.form}>
            {checkoutStep === 0 && (
              <>
                <Text style={S.section}>
                  Dados para contato
                </Text>

                <Text style={S.muted}>
                  Olá, {user?.name || "cliente"}. Informe seu
                  telefone.
                </Text>

                <Field
                  label="Telefone"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholder="(00) 00000-0000"
                />

                <Button
                  title="Continuar"
                  onPress={() => {
                    if (!phone.trim()) {
                      return msg("Informe um telefone.");
                    }

                    setCheckoutStep(1);
                  }}
                />
              </>
            )}

            {checkoutStep === 1 && (
              <>
                <Text style={S.section}>
                  Como deseja receber?
                </Text>

                <TouchableOpacity
                  style={[
                    S.option,
                    fulfillment === "Entrega" && S.optionOn,
                  ]}
                  onPress={() => setFulfillment("Entrega")}
                >
                  <Text style={S.optionTitle}>
                    🚚 Entrega
                  </Text>
                  <Text style={S.muted}>
                    Receba no endereço informado.
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    S.option,
                    fulfillment === "Retirada" && S.optionOn,
                  ]}
                  onPress={() => setFulfillment("Retirada")}
                >
                  <Text style={S.optionTitle}>
                    🏪 Retirada na loja
                  </Text>
                  <Text style={S.muted}>
                    Sem taxa de entrega.
                  </Text>
                </TouchableOpacity>

                {fulfillment === "Entrega" && (
                  <>
                    <Field
                      label="Rua ou avenida"
                      value={street}
                      onChangeText={setStreet}
                      placeholder="Nome da rua"
                    />

                    <Field
                      label="Número"
                      value={houseNumber}
                      onChangeText={setHouseNumber}
                      placeholder="Número do imóvel"
                      keyboardType="numeric"
                    />

                    <Field
                      label="Bairro"
                      value={neighborhood}
                      onChangeText={setNeighborhood}
                      placeholder="Nome do bairro"
                    />

                    <Field
                      label="Cidade"
                      value={city}
                      onChangeText={setCity}
                      placeholder="Cidade"
                    />

                    <Field
                      label="Complemento (opcional)"
                      value={complement}
                      onChangeText={setComplement}
                      placeholder="Casa, apartamento, bloco..."
                    />

                    <Field
                      label="Ponto de referência (opcional)"
                      value={reference}
                      onChangeText={setReference}
                      placeholder="Perto de..."
                    />

                    <Text style={S.fieldLabel}>
                      Faixa de entrega estimada
                    </Text>

                    {[
                      {
                        value: "3",
                        label: "Até 3 km — R$ 5,00",
                      },
                      {
                        value: "6",
                        label:
                          "Acima de 3 km até 6 km — R$ 8,00",
                      },
                      {
                        value: "10",
                        label:
                          "Acima de 6 km até 10 km — R$ 12,00",
                      },
                    ].map((zone) => (
                      <TouchableOpacity
                        key={zone.value}
                        style={[
                          S.option,
                          deliveryZone === zone.value &&
                            S.optionOn,
                        ]}
                        onPress={() =>
                          setDeliveryZone(zone.value)
                        }
                      >
                        <Text style={S.optionTitle}>
                          {deliveryZone === zone.value
                            ? "● "
                            : "○ "}
                          {zone.label}
                        </Text>
                      </TouchableOpacity>
                    ))}

                    <Text style={S.note}>
                      A faixa é escolhida manualmente. O app
                      ainda não calcula a distância real.
                    </Text>
                  </>
                )}

                <Button
                  title="Continuar"
                  onPress={() => {
                    if (
                      fulfillment === "Entrega" &&
                      (!street.trim() ||
                        !houseNumber.trim() ||
                        !neighborhood.trim() ||
                        !city.trim())
                    ) {
                      return msg(
                        "Preencha rua, número, bairro e cidade."
                      );
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
                <Text style={S.section}>
                  Forma de pagamento
                </Text>

                {[
                  "Pix",
                  "Cartão de crédito",
                  "Cartão de débito",
                  "Dinheiro",
                ].map((method) => (
                  <TouchableOpacity
                    key={method}
                    style={[
                      S.option,
                      payment === method && S.optionOn,
                    ]}
                    onPress={() => setPayment(method)}
                  >
                    <Text style={S.optionTitle}>
                      {payment === method ? "● " : "○ "}
                      {method}
                    </Text>
                  </TouchableOpacity>
                ))}

                <Text style={S.note}>
                  O pagamento não é processado nesta
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
                <Text style={S.section}>
                  Revise seu pedido
                </Text>

                {cart.map((product) => (
                  <View
                    key={product.id}
                    style={S.summaryRow}
                  >
                    <Text style={S.muted}>
                      {product.quantity}x {product.name}
                    </Text>

                    <Text style={S.summaryValue}>
                      {money(
                        product.price * product.quantity
                      )}
                    </Text>
                  </View>
                ))}

                <View style={S.separator} />

                <View style={S.summaryRow}>
                  <Text style={S.muted}>Subtotal</Text>
                  <Text style={S.summaryValue}>
                    {money(subtotal)}
                  </Text>
                </View>

                <View style={S.summaryRow}>
                  <Text style={S.muted}>
                    Taxa de entrega
                  </Text>
                  <Text style={S.summaryValue}>
                    {money(fee)}
                  </Text>
                </View>

                <View style={S.summaryRow}>
                  <Text style={S.totalLabel}>Total</Text>
                  <Text style={S.total}>
                    {money(total)}
                  </Text>
                </View>

                <View style={S.separator} />

                <Text style={S.muted}>
                  Recebimento: {fulfillment}
                </Text>

                {fulfillment === "Entrega" && (
                  <Text style={S.muted}>
                    Endereço: {fullAddress}
                  </Text>
                )}

                <Text style={S.muted}>
                  Pagamento: {payment}
                </Text>

                <Text style={S.muted}>
                  Telefone: {phone}
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

                <Text style={S.note}>
                  Nenhum pagamento ou entrega real será
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
  if (screen === "success" && currentOrder) {
    return (
      <SafeAreaView style={S.safe}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={C.bg}
        />

        <ScrollView contentContainerStyle={S.center}>
          <Text
            style={{
              fontSize: 55,
              color: C.green,
            }}
          >
            ✓
          </Text>

          <Text style={S.successTitle}>
            Pedido registrado!
          </Text>

          <Text style={S.muted}>
            Registro local de demonstração.
          </Text>

          <View style={S.form}>
            <Text style={S.section}>Resumo</Text>

            <Text style={S.muted}>
              Número: {currentOrder.id}
            </Text>

            <Text style={S.muted}>
              Data: {currentOrder.date}
            </Text>

            <Text style={S.muted}>
              Pagamento: {currentOrder.payment}
            </Text>

            <Text style={S.total}>
              Total: {money(currentOrder.total)}
            </Text>

            <Text style={S.note}>
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
      <SafeAreaView style={S.safe}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={C.bg}
        />

        {header("Meus pedidos")}

        <ScrollView contentContainerStyle={S.page}>
          {orders.length === 0 ? (
            <View style={S.empty}>
              <Text style={S.emptyTitle}>
                Nenhum pedido ainda
              </Text>

              <Button
                title="Explorar produtos"
                onPress={() => {
                  setScreen("catalog");
                  setActiveTab("Início");
                }}
              />
            </View>
          ) : (
            orders.map((order) => (
              <View key={order.id} style={S.form}>
                <Text style={S.price}>{order.id}</Text>

                <Text style={S.muted}>
                  {order.date}
                </Text>

                <Text style={S.muted}>
                  {order.fulfillment} · {order.payment}
                </Text>

                {order.fulfillment === "Entrega" && (
                  <Text style={S.muted}>
                    Endereço: {order.address}
                  </Text>
                )}

                <Text style={S.total}>
                  {money(order.total)}
                </Text>

                <Text style={S.note}>
                  Pedido demonstrativo
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        {bottomNav()}
      </SafeAreaView>
    );
  }

  // PERFIL
  if (screen === "profile") {
    return (
      <SafeAreaView style={S.safe}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={C.bg}
        />

        {header("Meu perfil")}

        <ScrollView contentContainerStyle={S.page}>
          <View style={S.form}>
            <View style={S.avatar}>
              <Text style={S.logoText}>
                {(user?.name || "U")
                  .charAt(0)
                  .toUpperCase()}
              </Text>
            </View>

            <Text style={S.section}>
              {user?.name || "Usuário"}
            </Text>

            <Text style={S.muted}>
              {user?.email || ""}
            </Text>

            <Button
              title="Meus pedidos"
              onPress={() => {
                setScreen("orders");
                setActiveTab("Pedidos");
              }}
            />

            <Button
              title="Meus favoritos"
              secondary
              onPress={() => {
                setScreen("catalog");
                setActiveTab("Favoritos");
              }}
            />

            <Button
              title="Sair da conta"
              secondary
              onPress={() => {
                setUser(null);
                setPassword("");
                setScreen("auth");
                setAuthMode("login");
              }}
            />
          </View>

          <Text style={S.note}>
            Dados mantidos apenas em memória nesta demonstração.
          </Text>
        </ScrollView>

        {bottomNav()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={S.safe}>
      <Text style={S.brand}>FAJA ADEGA</Text>
      <Button
        title="Voltar ao catálogo"
        onPress={() => setScreen("catalog")}
      />
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },
  center: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    paddingBottom: 35,
  },
  page: {
    padding: 16,
    paddingBottom: 32,
  },
  catalog: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 24,
  },
  logo: {
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
  logoSmall: {
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
  logoText: {
    color: C.gold,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 2,
  },
  brand: {
    color: C.gold,
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 2,
  },
  brandSub: {
    color: C.muted,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 26,
    fontSize: 14,
  },
  form: {
    width: "100%",
    backgroundColor: C.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    padding: 18,
    marginTop: 16,
    gap: 12,
  },
  section: {
    color: C.white,
    fontSize: 19,
    fontWeight: "800",
  },
  muted: {
    color: C.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  field: {
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
  multiline: {
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
  checked: {
    backgroundColor: C.gold,
  },
  checkText: {
    color: C.white,
    flex: 1,
    fontSize: 13,
  },
  note: {
    color: C.muted,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 10,
  },
  link: {
    color: C.gold,
    fontWeight: "700",
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 10,
  },
  backLink: {
    color: C.gold,
    fontSize: 16,
    fontWeight: "700",
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
  back: {
    width: 36,
    height: 42,
    justifyContent: "center",
  },
  backText: {
    color: C.gold,
    fontSize: 36,
    lineHeight: 40,
  },
  headerTitle: {
    color: C.white,
    fontWeight: "800",
    fontSize: 17,
  },
  headerSub: {
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
  badge: {
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
  badgeText: {
    color: C.bg,
    fontSize: 10,
    fontWeight: "900",
  },
  banner: {
    backgroundColor: C.burgundy,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: C.gold,
    padding: 20,
    marginBottom: 16,
  },
  bannerSmall: {
    color: C.gold,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
  },
  bannerTitle: {
    color: C.white,
    fontSize: 28,
    fontWeight: "900",
    marginTop: 5,
  },
  bannerDesc: {
    color: "#F0DDE2",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },
  chip: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  chipOn: {
    backgroundColor: C.gold,
    borderColor: C.gold,
  },
  chipText: {
    color: C.white,
    fontSize: 12,
    fontWeight: "700",
  },
  chipTextOn: {
    color: C.bg,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 10,
    gap: 8,
  },
  grid: {
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
  favorite: {
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
  favoriteText: {
    color: C.gold,
    fontSize: 23,
    fontWeight: "700",
  },
  productImage: {
    width: "100%",
    height: 145,
    backgroundColor: C.card2,
  },
  productInfo: {
    paddingHorizontal: 10,
    paddingTop: 10,
    minHeight: 116,
  },
  categoryLabel: {
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
  meta: {
    color: C.muted,
    fontSize: 10,
    marginTop: 5,
  },
  price: {
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
  detailImageWrap: {
    height: 280,
    backgroundColor: C.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.border,
    overflow: "hidden",
    position: "relative",
    marginBottom: 18,
  },
  detailImage: {
    width: "100%",
    height: "100%",
  },
  detailFav: {
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
  detailTitle: {
    color: C.white,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 7,
  },
  detailPrice: {
    color: C.gold,
    fontSize: 26,
    fontWeight: "900",
    marginTop: 14,
  },
  description: {
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
  empty: {
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
  cartImage: {
    width: 82,
    height: 100,
    borderRadius: 12,
    backgroundColor: C.card2,
  },
  cartName: {
    color: C.white,
    fontWeight: "800",
    fontSize: 14,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 9,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: C.burgundy,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    color: C.gold,
    fontSize: 20,
    fontWeight: "900",
  },
  qty: {
    color: C.white,
    fontSize: 14,
    fontWeight: "800",
  },
  remove: {
    color: C.danger,
    fontSize: 10,
    fontWeight: "700",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 10,
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
  total: {
    color: C.gold,
    fontSize: 19,
    fontWeight: "900",
    textAlign: "right",
  },
  nav: {
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
  selected: {
    color: C.gold,
  },
  steps: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  step: {
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
  stepActive: {
    backgroundColor: C.gold,
    borderColor: C.gold,
  },
  stepNum: {
    color: C.bg,
    fontSize: 12,
    fontWeight: "900",
  },
  stepLabel: {
    color: C.muted,
    fontSize: 10,
  },
  option: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 13,
    marginTop: 9,
    backgroundColor: C.bg,
  },
  optionOn: {
    borderColor: C.gold,
    backgroundColor: C.card2,
  },
  optionTitle: {
    color: C.white,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4,
  },
  successTitle: {
    color: C.gold,
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: C.burgundy,
    borderWidth: 2,
    borderColor: C.gold,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});