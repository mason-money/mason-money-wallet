defmodule Wallet.TransactionTest do
  use Wallet.ModelCase

  alias Wallet.Transaction

  @valid_attrs %{amount: 42, from_id: 42, to_id: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Transaction.changeset(%Transaction{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Transaction.changeset(%Transaction{}, @invalid_attrs)
    refute changeset.valid?
  end
end
