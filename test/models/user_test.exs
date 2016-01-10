defmodule MasonMoneyWallet.UserTest do
  use MasonMoneyWallet.ModelCase

  alias MasonMoneyWallet.User

  @valid_attrs %{facebook_id: "some content", private_key: "some content", username: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
